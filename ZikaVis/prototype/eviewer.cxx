#include <iostream>
#include <fstream>
#include <sstream>
#include <iterator>
#include <iomanip>
#include <memory>
#include <string>
#include <list>
#include <set>
#include <vector>
#include <map>
#include <memory>
#include <stdexcept>
#include <algorithm>
#include <functional>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <math.h>
#include <values.h>
#include <sys/types.h>
#include <sys/time.h>
#include <sys/stat.h>
#include <errno.h>
#include <assert.h>
#include <GLX.h>
#include <glxTrackball.h>
#include <glxTrackpad.h>
#include <Draggers/Slider.h>

#include <AT_ExtractBuffer.h>
#include <AT_render.h>

#include <debug.h>
#include <glerr.h>
#include <fio.h>
#include <timer.h>
#include <swapit.h>
#include <str.h>
#include <vec.h>

using namespace std;

const int UNSET=-1;
enum {IVERT=0,INORM=2,ITEX=3};

struct extRenderer {

  extRenderer(AT::ExtractBuffer*, int);

  void draw(void);
  unsigned init(void);

  unsigned elemType;
  AT::ExtractBuffer* ebuf;
  int eidx,nverts;
  unsigned vao;
};

struct Run {
  Run(void):env(0),tb(0),
           bbox(FM::V3R(MAXFLOAT,MAXFLOAT,MAXFLOAT),FM::V3R(-MAXFLOAT,-MAXFLOAT,-MAXFLOAT) )
  {}
  glx* env;
  Glx::Trackball* tb;
  Glx::Slider* xs;

  FM::BB3R bbox;

  std::vector< AT::ExtractBuffer* > ebuffers;
  std::vector< extRenderer* > extRenderers;
};

extRenderer::extRenderer(AT::ExtractBuffer* e, int ei) : ebuf(e), eidx(ei),nverts(0)
{
  init();
}

unsigned extRenderer::init(void)
{
  AT::Extract& ext = ebuf->at(eidx);

  try {
    std::string sizestr;
    ext.get_property( "size", &sizestr);
    nverts = atoi(sizestr.c_str());
  } catch( std::exception& e ){
    DIE("error parsing extract: 'size' property not found");
  }

  glGenVertexArrays(1, &vao);
  GLERROR("glGenVertexArrays");

  glBindVertexArray(vao);
  GLERROR("glBindVertexArray");

  float* p[3]={NULL,NULL,NULL};
  off_t s[3]={0,0,0};
  int xidx=UNSET,yidx=UNSET,zidx=UNSET;

  for(int fidx=0 ; fidx < static_cast<int>(ext.fields.size()) ; ++fidx ){
    if( not ext.fields[fidx].name.compare("x") ) xidx=fidx;
    if( not ext.fields[fidx].name.compare("y") ) yidx=fidx;
    if( not ext.fields[fidx].name.compare("z") ) zidx=fidx;
  }

  if( xidx==UNSET or yidx==UNSET  or zidx==UNSET ) DIE("error parsing extract");
  ebuf->initialize_accessor(eidx,xidx,&p[0],&s[0]);
  ebuf->initialize_accessor(eidx,yidx,&p[1],&s[1]);
  ebuf->initialize_accessor(eidx,zidx,&p[2],&s[2]);

  int XYZ=3;
  int bytesPerVert = static_cast<int>(s[0] * sizeof(GLfloat));
  int arrayBytes = static_cast<int>(nverts * bytesPerVert);
  unsigned vrtbuf;

  glGenBuffers(1, &vrtbuf);

  glBindBuffer(GL_ARRAY_BUFFER, vrtbuf);
  GLERROR("glBindBuffer");

  glBufferData(GL_ARRAY_BUFFER, arrayBytes, (float*) p[0], GL_STATIC_DRAW);
  GLERROR("glBufferData");

  glVertexAttribPointer(IVERT, XYZ, GL_FLOAT, GL_FALSE, bytesPerVert, 0);
  GLERROR("glVertexAttribPointer");

  glEnableVertexAttribArray(IVERT);
  GLERROR("glEnableVertexAttribArray");

  /*
  store the scalar into a texture...

  size_t texbytes = tex.size() * sizeof(GLfloat);
  glGenBuffers(1, &texbuf);
  glBindBuffer(GL_ARRAY_BUFFER, texbuf);
  glBufferData(GL_ARRAY_BUFFER, texbytes, (float*) &tex[0], GL_STATIC_DRAW);
  glVertexAttribPointer(ITEX, floatsPerTex, GL_FLOAT, GL_FALSE, 0, 0);
  glEnableVertexAttribArray(ITEX);
  */
  return vao;
}

void extRenderer::draw(void)
{
  glBindVertexArray(vao);
  glDrawArrays(GL_POINTS, 0, nverts);
  glBindVertexArray(0);
}

void merge(FM::BB3R& globalbbox, const FM::BB3R& objbbox)
{
  for(int d=0;d<3;++d){
    globalbbox.min[d] = std::min(globalbbox.min[d],objbbox.min[d]);
    globalbbox.max[d] = std::max(globalbbox.max[d],objbbox.max[d]);
  }
}

void prerender(Run* run, AT::ExtractBuffer* ext)
{
  FANCYMESG(__PRETTY_FUNCTION__);

}

void draw(glx* env, void* user)
{
  Run* run=static_cast<Run*>(user);

  // colormapping:
  //
  // save the current texture unit
  // set the texture unit
  // pushattrib: current,texture,transform,...
  // bind a colormap texture
  // save the texture modelview matrix...
  //
  // apply transforms [shift+scale] to the texture modelview matrix to
  // normalize the scalar stored as 1D texture coords

  glColor4f(1,1,1,1);
  for( auto eRenderer : run->extRenderers ){
    eRenderer->draw();
  }

  // ... restore everything
}

bool key(glx* env, XEvent *event, void* user)
{
  Run* run=static_cast<Run*>(user);
  KeySym ks = XLookupKeysym((XKeyEvent*)event,0);
  bool done=true;
  switch( ks ){
    case XK_q:
      exit(0);
      break;
    default:
     done=false;
     break;
  }
  if(done) env->wakeup();
  return done;
}

void xcb(void* user, float fval)
{
  Run* run=static_cast<Run*>(user);
  run->env->wakeup();
}


void initGL(glx* env, void* user)
{
  Run* run=static_cast<Run*>(user);
  run->env = env;
  run->tb  = new Glx::Trackball(env);
  run->tb->viewAll( (float*)run->bbox.min, (float*)run->bbox.max );

  for( auto ebuf : run->ebuffers ){

    for( int eidx=0 ; eidx<static_cast<int>(ebuf->size()) ; ++eidx){
      run->extRenderers.push_back( new extRenderer( ebuf,eidx ) );
    }
  }

  int xp=30,xd=90;
  run->xs = new Glx::Slider(env,Glx::Slider::Y,xp,30,200);
  run->xs->setRange(0,50,100);
  run->xs->setCallback(xcb,run);
  run->xs->setSnapToInt(true);
  xp+=xd;
  env->addDrawFunc(draw,run);
  env->addKeyDownFunc(key,run);
}

int
main(int argc, char** argv)
{
  Run* run=new Run;
  int c;
  while( (c = getopt(argc,argv,"e:")) != -1 )
  {
    switch( c ){
      case 'e':
       {
         AT::ExtractBuffer* ebuf = new AT::ExtractBuffer();
         ebuf->read(optarg);
         VAR( ebuf->size() );
         for( int eidx=0 ; eidx<static_cast<int>(ebuf->size()) ; ++eidx){
           AT::Extract& ext = ebuf->at(eidx);
           size_t nfields = ext.fields.size();
           for( auto &aref : ext.fields ){
             VAR( aref.name );
           }
           std::set<std::string> props = ext.properties.names();
           VAR( nfields );

           for( auto prop : props ){
             VAR( prop );
             std::string pval;
             bool gotit = ext.get_property( prop, &pval);
             if( not gotit ) DIE("error parsing ext");
             VAR2(prop,pval);
           }

           FM::BB3R bbox = ebuf->get_bounding_box(eidx);
           merge(run->bbox, bbox);
         }
         run->ebuffers.push_back(ebuf);
       }
       break;
    }
  }

  VAR( run->bbox );

  run->env=new glx(initGL,run);
  run->env->mainLoop();
  delete run->tb;
  delete run->env;
  delete run;
  return 0;
}
//set up global view divs
function initGlobalView(){
//set up global view divs	
d3.select("#global_container").append("div")
	.attr("id","gl_banner");
	
d3.select("#global_container").append("div")
	.attr("id","gl_middleview");	
	
d3.select("#gl_middleview").append("div")
	.attr("id","gl_mapview");	

d3.select("#gl_middleview").append("div")
	.attr("id","gl_awardview");
	
d3.select("#global_container").append("div")
	.attr("id","gl_chartview");	
	
d3.select("#gl_chartview").append("div")
	.attr("id","gl_epiData");
	
d3.select("#gl_epiData").append("div")
	.attr("id","epiDataTitle")
	.attr("class","chartTitle")
	.append("text")
	.text("WEEKLY EPIDEMIOLOGICAL DATA");	
	
d3.select("#gl_epiData").append("div")
	.attr("id","newConfirmedData")
	.text("CONFIRMED ZIKA CASES")
	.attr("class","subtitle");
	
d3.select("#newConfirmedData").append("div")
	.attr("id","new_conf");
	
d3.select("#newConfirmedData").append("div")
	.attr("id","cum_conf");		
	
d3.select("#gl_epiData").append("div")
	.attr("id","byIndicatorData");	
	
//banner global view
d3.select("#gl_banner").append("h1")
	.attr("class","banner")
	.text("ZikaVis");
	
d3.select("#gl_banner").append("h2")
	.attr("class","banner")
	.text("VISUALIZING USAID EFFORTS TO COMBAT ZIKA");		
}	
//set up country view divs
function initCountryView(){
d3.select("#container").append("div")
	.attr("id","banner");	

d3.select("#container").append("div")
	.attr("id","middleView");

d3.select("#container").append("div")
	.attr("id","chartview");
	
//middle column
//load title on load country	
d3.select("#middleView").append("div")
	.attr("id","mapheader");

d3.select("#middleView").append("div")
	.attr("id","mapview");	
	
d3.select("#middleView").append("div")
	.attr("id","awardview");
	
//chartview
d3.select("#chartview").append("div")
	.attr("id","censusDataTitle")
	.attr("class","chartTitle")
	.append("text")
	.text("CENSUS DATA");	
	
d3.select("#chartview").append("div")
	.attr("id","censusData");		
	
d3.select("#chartview").append("div")
	.attr("id","epiData");
	
d3.select("#epiData").append("div")
	.attr("id","epiDataTitle")
	.attr("class","chartTitle")
	.append("text")
	.text("WEEKLY EPIDEMIOLOGICAL DATA");	
	
d3.select("#epiData").append("div")
	.attr("id","nationalData")
	.append("text")
	.text("NATIONAL")
	.attr("class","subtitle");
	
d3.select("#epiData").append("div")
	.attr("id","subnationalData")
	.append("text")
	.text("SUBNATIONAL")
	.attr("class","subtitle");
	

//banner
d3.select("#banner").append("h1")
	.attr("class","banner")
	.text("ZikaVis");
	
d3.select("#banner").append("h2")
	.attr("class","banner")
	.text("VISUALIZING USAID EFFORTS TO COMBAT ZIKA");
/*var update_cv = d3.select("#banner").append("button")
	.attr("class","banner_btn")
	.text("Update Data");	*/
	
/*var update_gl = d3.select("#gl_banner").append("button")
	.attr("class","banner_btn")
	.text("Update Data");*/		

//title with tabs, buttons
d3.select("#mapheader").append("div")
	.attr("id","maptitle")
	//.append("text")
	//.text("EL SALVADOR");
	
d3.select("#mapheader").append("div")
	.attr("id","tabs");
	
var overview_tab = d3.select("#tabs").append("div")
	.attr("class","tab")
	.attr("id","overview_tab")
	.on("mouseover",function(d){
		//d3.select(this).style("background","#ccc");
	})
	.on("mouseout",function(d){
		/*if(!d3.select(this).selected){
		d3.select(this).style("background","none");
		}*/
	});
	
	var lbl_o = overview_tab.append("text")
	.text("overview");
	
var temporalview_tab = d3.select("#tabs").append("div")
	.attr("class","tab")
	.attr("id","temporal_view_tab")
	.on("mouseover",function(d){
		//d3.select(this).style("background","#ccc");
	})
	.on("mouseout",function(d){
		/*console.log(d3.select(this).selected);
		if(!d3.select(this).selected){
		d3.select(this).style("background","none");
		}*/
	})
	
	var lbl_t = temporalview_tab.append("text")
	.text("temporal view");		
	
	
d3.select("#mapheader").append("div")
	.attr("id","buttons");
	
var tot_btn = d3.select("#buttons").append("div")
	.attr("class","toggle_button");
	
	tot_btn.append("text")
	.text("total cases");

var pht_btn = d3.select("#buttons").append("div")
	.attr("class","toggle_button");
	
	pht_btn.text("per H.T.");
				
//awards data
d3.select("#awardview").append("div")
	.attr("id","awardData")
	.append("text")
	.text("USAID AWARDS")
	.attr("class","subtitle");		
}	
//projections
function initGlobalProjection(){
//setup topojson stuff -- paths and projections
/************global projection**************/	
	
//Map projection
global_projection = d3.geoMercator()
    .scale(500)
	//.scale(100)
    .center([0,0]) //projection center
	.translate([gl_width/2+700,gl_height/2+100]) //translate to center the map in view	
	//.translate([width/2,height/2]);

//Generate paths based on projection
global_path = d3.geoPath()
    .projection(global_projection);	

//Create an SVG
global_svg = d3.select("#gl_mapview").append("svg")
	.attr("class","gl_mapview")
    .attr("width", gl_width-1)
    .attr("height", gl_height-1);	

//Group for the map features
global_land = global_svg.append("g")
    .attr("class","gl_land");
	
//Group for the map features
global_features = global_svg.append("g")
    .attr("class","gl_features");
	
//Group for the map features
global_awards = global_svg.append("g")
	.attr("class","gl_awards");		
	
global_bcharts = global_svg.append("g")
	.attr("class","gl_bcharts");	
	
global_labels = global_svg.append("g");			
	
/************end global projection**************/
}

//draw menu
function drawMenu(){
 //global view button	  
	var global_view_btn = d3.select("#mapheader").append("button")
	  .text("Global View")
	  .on("click", function(d){
		d3.select("#overview").style("opacity",0);  
	  	d3.select("#global_container").moveToFront();
	  });
  }
  
function init() {
	    Tabletop.init( { key: publicSpreadsheetUrl,
	                     callback: addMarkers,
	                     simpleSheet: true } )
	  }

	  function addMarkers(data, tabletop) {
		footnote_data = data;
		footnotes = new L.FeatureGroup();
		for(i=0;i<footnote_data.length;i++){
			//console.log(footnote_data[i]);
		  	if(footnote_data[i].lat != "" && footnote_data[i].lng != "" && footnote_data[i].comment != ""){
			_marker = L.marker([+footnote_data[i].lat,+footnote_data[i].lng]).bindPopup(footnote_data[i].comment);
			//console.log(_marker);
			footnotes.addLayer(_marker);
			}
		}
		//console.log("break");
		//console.log(country_map);
		if(country_map != undefined){
		footnotes.addTo(country_map);
		}
	  }	
	
//load data
queue()
	.defer(d3.json, "admin_0_countries.json")
	.defer(d3.json, "admin_1_states_provinces.json")
    .defer(d3.json, "el_salvador_epi.json")
	.defer(d3.json, "countryData.json")
	.defer(d3.json, "populated_places2.json")
	.defer(d3.json, "poverty2.json")
	.defer(d3.json, "usaidawards.json")
	.defer(d3.json,"IPPFClinics.json")
	.defer(d3.json, "globalData2.json")
	.defer(d3.json, "Partners.json")
	.defer(d3.json, "PAHO_subnational_cleaned.json")
	.defer(d3.json, "award_info_assist.json")
	.defer(d3.json, "adm2_shapes.json")
	.defer(d3.json, "populated_places.json")
	.defer(d3.json, "epidata_all.json")
	.defer(d3.json, "fips2.json")
	.defer(d3.json, "rainfall_national.json")
	//.defer(d3.csv,"https://docs.google.com/spreadsheets/d/18xaJk0uObdu5WNgd2yMSxzgyS3Oz2oJ5qBMEkR0z1QI/pub?output=csv")
	//.defer(d3.json, "elsalve.json")
    .await(ready);	
	
function strip(string){
			if(string == undefined){return string;}
			return string.toLowerCase().replace("ó","o").replace("í","i").replace("á","a").replace("ñ","n").replace("é","e"); 		
};	
		
function ready(error, geodata_admin0/*admin0data*/, geodata_admin1/*adm1data*/, epidata/*SVLdata*/, censusdata/*countrydata*/, pop_pls, poverty, awards, IPPFclinics, globaldata, partners, paho_sub, award_info, adm2_shapes, places, epidata_all,fips,rainfall){	
	  if (error) throw error;	
	  
  	 var award_shapes = [];
  	 var award_info2 = [];
	  
	  //store shape info
	  var adm2_shapes2 = [{key:"COL", value:topojson.feature(adm2_shapes,adm2_shapes.objects.COL_adm2).features},
	  {key:"DOM", value:topojson.feature(adm2_shapes,adm2_shapes.objects.DOM_adm2).features},
	  {key:"ECU", value:topojson.feature(adm2_shapes,adm2_shapes.objects.ECU_adm2).features},
	  {key:"GTM", value:topojson.feature(adm2_shapes,adm2_shapes.objects.GTM_adm2).features},
	  {key:"HND", value:topojson.feature(adm2_shapes,adm2_shapes.objects.HND_adm2).features},
	  {key:"HTI", value:topojson.feature(adm2_shapes,adm2_shapes.objects.HTI_adm2).features},
	  {key:"NIC", value:topojson.feature(adm2_shapes,adm2_shapes.objects.NIC_adm2).features},
	  {key:"PER", value:topojson.feature(adm2_shapes,adm2_shapes.objects.PER_adm2).features},
	  {key:"SLV", value:topojson.feature(adm2_shapes,adm2_shapes.objects.SLV_adm2).features},
	  {key:"VEN", value:topojson.feature(adm2_shapes,adm2_shapes.objects.VEN_adm2).features}];
	 
 	 
	 //award info by country
	 var award_infobyc = d3.nest()
 	 .key(function(d){return d.ADM0;})
 	 .entries(award_info); 
	 
 	 award_infobyc.forEach(function(e,i){
 		 var shapes = adm2_shapes2.filter(function(c){return c.key == e.key;})[0].value; 
 		 e.values.forEach(function(d,j){
 			 var res = shapes.filter(function(v){return (strip(v.properties.NAME_0) == strip(d.Country)) && (strip(v.properties.NAME_1) == strip(d.Department)) && ((strip(v.properties.NAME_2) == strip(d.Municipality)) || (strip(v.properties.VARNAME_2) == strip(d.Municipality)));});
 			 if(res[0] == undefined){console.log(d);}else{
 				award_shapes.push(res[0]);
 				award_info2.push(d);
 			 }
 		 })
 	 });
	  
	  /***************format data************/
	  var parseTime = d3.timeParse("%m/%e/%y");
	  var parseYear = d3.timeFormat("%y");
	  var parseMonth = d3.timeFormat("%B");
	  var parseMonth_n = d3.timeFormat("%-m");
	  var parseTime2 = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
	  
	  
	  //sorting global data by date
	  globaldata.forEach(function(d,i){
	  		  d.date = parseTime2(d.date);
	  		  d.year = parseYear(d.date);
			  d.month = parseMonth_n(d.date);
	  	  });
		  
	  globaldata.sort(function(a,b){return a.date - b.date;}); 
	  
	  
	  //same for epi data
	  epidata_all.forEach(function(d,i){
		  d.report_date = parseTime(d.report_date);
		  d.year = parseYear(d.report_date);
		  d.month = parseMonth(d.report_date);
	  });
	  
	  //sort by report data
	  epidata_all.sort(function(a,b){return a.report_date - b.report_date;});
	 
	 epidata_all.forEach(function(d,i){
		  var s = d.location.split("-");
		  d.country = s[0].replace(/_/g," ");
		  if(s[1]!=undefined){
			  d.amd1_name = s[1].replace(/_/g," ");
		  }else{
		  	 d.amd1_name = s[0].replace(/_/g," ");
		  }
		  var c = fips.filter(function(v){return strip(v.country_name) == strip(d.country) && strip(v.subnational_name) == strip(d.amd1_name);})[0];
			  if(c!=undefined){
				  d.fips = c.fips;
				  d.pop = c.population;
				  if(c.population != undefined){
				  d.p_ht = d.value/(c.population/100000);
			  	  }else{
					 d.p_ht = null;
			  	  }
			  }else{
				  d.fips = null;
				  d.p_ht=null;
			  } 
	  })
	  
	  var epibycountrybyfips = d3.nest()
	  .key(function(d){return d.country;})
	  .key(function(d){return d.fips;})
	  .entries(epidata_all);
	  
	  
	  var pahobycountry = d3.nest()
	  .key(function(d){return d.CNTRY_CODE;})
	  .key(function(d){return d.ADM1_CODE;})
	  .entries(paho_sub);
	  
	  var partnersbyLine = d3.nest()
	  .key(function(d){return d.line_of_effort;})
	  .key(function(d){return d.country;})
	  .entries(partners);
	  
	  var partnersbyLinebyPartner = d3.nest()
	  .key(function(d){return d.line_of_effort;})
	  .key(function(d){return d.partner;})
	  .key(function(d){return d.country;})
	  .entries(partners);
	  
	  var partnersbyCountrybyLinebyPartner = d3.nest()
	  .key(function(d){return d.country;})
	  .key(function(d){return d.line_of_effort;})
	  .key(function(d){return d.partner;})
	  .key(function(d){return d.country;})
	  .entries(partners);
	  
	  var rainfall = rainfall;
	  
	  var globaldataF = globaldata.filter(function(d){return priority_countries.indexOf(d.country) != -1;});
	  var globaldataFS = globaldata.filter(function(d){return priority_countries.indexOf(d.country) != -1;}).sort(function(a, b){ return d3.ascending(a.autochthonous_cases_confirmed, b.autochthonous_cases_confirmed);});
	  
	  
	  var globalbycountry = d3.nest()
	  .key(function(d){return d.country;})
	  .entries(globaldataF)
	  .sort(function(a, b){return a.date - b.date; });
	  
	  
	  var globalbycountryS = d3.nest()
	  .key(function(d){return d.country;})
	  .entries(globaldataFS);
	  
	  //add new cases
	  var last = 0;
	  globalbycountry.forEach(function(d){
		  d.values.forEach(function(e,i){
			  if(i==0){
				  last = 0;
				  e.new_autochthonous_cases_confirmed = 0;//e.autochthonous_cases_confirmed - last;
			  }else if(i > 0){
			    e.new_autochthonous_cases_confirmed = e.autochthonous_cases_confirmed - last;	
			  }
			 last = e.autochthonous_cases_confirmed;
	  	})
	  })
	  
	  
	  //this will vary!!
	  var global_indicators = ["autochthonous_cases_confirmed","autochthonous_cases_suspected","confirmed_congenital_syndrome","death_among_zika_cases","imported_cases","incidence_rate"];	  
	  var awards_topo = topojson.feature(awards,awards.objects.usaidawards).features;
	  
	  //awards by partners
	  var awardsbyPartner = d3.nest()
	  .key(function(d){return d.properties.Partner;})
	  .entries(awards_topo);
	  
	  var awardsAssistbyCountry = d3.nest()
	  .key(function(d){return d.properties.ASSIST;})
	  .key(function(d){return d.properties.Country;})
	  .entries(awards_topo);
	  
	  var awardsbyISO = d3.nest()
	  .key(function(d){return d.properties.ISO;})
	  .entries(awards_topo);
	  
	  var awardsbyCountry = d3.nest()
	  .key(function(d){return d.properties.Country;})
	  .entries(awards_topo);
	  
	  var awardsbyCountrybyPartner = d3.nest()
	  .key(function(d){return d.properties.Country;})
	  .key(function(d){return d.properties.Partner;})
	  .entries(awards_topo);
	  
	  var awardsbyCountryAssist = d3.nest()
	  .key(function(d){return d.properties.NAME_0;})
	  .key(function(d){return d.properties.ASSIST;})
	  .entries(awards_topo);
	  
	  //nest data upfront
	  var byRegion = d3.nest()
	  .key(function(d){return d.fips;})
	  .key(function(d){return d.data_field;})
	  .entries(epidata_all);
	  
	  var byRegion_svl = d3.nest()
	  .key(function(d){return d.fips;})
	  .key(function(d){return d.data_field;})
	  .entries(epidata);
	  
	  var byCountrybyIndbyRegion = d3.nest()
	  .key(function(d){return d.country;})
	  .key(function(d){return d.data_field;})
	  .key(function(d){return d.fips;})
	  .entries(epidata_all.filter(function(v){return v.location_type != "country";}));//v.fips.indexOf("00") == -1;}));
  
	  var totalbyRegionbyYear = d3.nest()
	  .key(function(d){return d.fips;})
	  .key(function(d){return d.data_field;})
	  .key(function(d){return d.year;})
	  .rollup(function(d){return d3.max(d,function(v){return v.value;})})
	  .entries(epidata);
	  
	  var byDatebyRegion = d3.nest()
	  .key(function(d){return d.report_date;})
	  .key(function(d){return d.fips;})
	  .key(function(d){return d.data_field;})
	  .entries(epidata);
	  
	  var byCountrybyDatebyRegion = d3.nest()
	  .key(function(d){return d.country;})
	  .key(function(d){return d.report_date;})
	  .key(function(d){return d.fips;})
	  .key(function(d){return d.data_field;})
	  .entries(epidata_all);
	  
	  var povertyByCountryByRegion2 = d3.nest()
	  .key(function(d){
	  	var code = d.Country_Code.split("_");
		return code[0];
	  })
	  .key(function(d){
		  var code = d.Country_Code.split("_");
		  return code[code.length-1];})
		  .rollup(function(d){
			  //var stats = [d[0]._1996,d[0]._1997,d[0]._1998,d[0]._1999,d[0]._2000,d[0]._2001,d[0]._2002,d[0]._2003,d[0]._2004,d[0]._2005,d[0]._2006, d[0]._2007, d[0]._2008, d[0]._2009,d[0]._2010,d[0]._2011,d[0]._2012,d[0]._2013];
			  var stats = [d[0]._1996,d[0]._1997,d[0]._1998,d[0]._1999,d[0]._2000,d[0]._2001,d[0]._2002,d[0]._2003,d[0]._2004,d[0]._2005,d[0]._2006, d[0]._2007, d[0]._2008, d[0]._2009,d[0]._2010,d[0]._2011,d[0]._2012,d[0]._2013];
			  var year;
			  var latest_stat;
			  stats.forEach(function(l,i){
				  if(l!=undefined){
					  year = 1996+i;
					  latest_stat = l;
				  }
			  })
			  return {
				  all: d,
				  stats:stats,
				  latest: latest_stat,
				  latest_stat_year: year
			  }
		  })	  
		  .entries(poverty)
		  .sort(function(a, b){ return d3.descending(a.values[0].value.latest, b.values[0].value.latest); });
		  
	  
	  var povertyByCountryByRegion = d3.nest()
	  .key(function(d){
	  	var code = d.Country_Code.split("_");
		//if(code[0] == "HND"){console.log(code[0]);}
		return code[0];
	  })
	  .key(function(d){
		  var code = d.Country_Code.split("_");
		  var n = d.Country_Code.indexOf(".");
		  if(n == -1){
		  	return code[code.length-1];
		  }else{
		  return  d.Country_Code.substring(n-2,n+3); }
	  	  })
		  .rollup(function(d){
			  var stats = [d[0]._1996,d[0]._1997,d[0]._1998,d[0]._1999,d[0]._2000,d[0]._2001,d[0]._2002,d[0]._2003,d[0]._2004,d[0]._2005,d[0]._2006, d[0]._2007, d[0]._2008, d[0]._2009,d[0]._2010,d[0]._2011,d[0]._2012,d[0]._2013];
			  var year;
			  var latest_stat;
			  stats.forEach(function(l,i){
				  if(l!=undefined){
					  year = 1996+i;
					  latest_stat = l;
				  }
			  })
			  return {
				  all: d,
				  stats:stats,
				  latest: latest_stat,
				  latest_stat_year: year
			  }
		  })	  
		  .entries(poverty)
		  .sort(function(a, b){ return d3.descending(a.values[0].value.latest, b.values[0].value.latest); });
		  
	  //nest poverty data
	  var povertyByFips = d3.nest()
	  .key(function(d){
		  var code = d.Country_Code.split("_");
		  var n = d.Country_Code.indexOf(".");
		  if(n == -1){
		  	return code[code.length-1];
		  }else{
		  return  d.Country_Code.substring(n-2,n+3); }
	  	  })
		  .key(function(d){return d.Indicator_Name;})  
		  .rollup(function(d){
			  var stats = [d[0]._1996,d[0]._1997,d[0]._1998,d[0]._1999,d[0]._2000,d[0]._2001,d[0]._2002,d[0]._2003,d[0]._2004,d[0]._2005,d[0]._2006, d[0]._2007, d[0]._2008, d[0]._2009,d[0]._2010,d[0]._2011,d[0]._2012,d[0]._2013];
			  var year;
			  var latest_stat;
			  stats.forEach(function(l,i){
				  if(l!=undefined){
					  year = 1996+i;
					  latest_stat = l;
				  }
			  })
			  return {
				  all: d,
				  stats:stats,
				  latest: latest_stat,
				  latest_stat_year: year
			  }
		  })	  
		  .entries(poverty)
		  .sort(function(a, b){ return d3.descending(a.values[0].value.latest, b.values[0].value.latest); });
		  
	  //change this later - back to original data
		  //need to add actual cumulative
		  byRegion.forEach(function(d){
		  	d.values.forEach(function(e){
		  	  e.values.forEach(function(f,i){
				  if(i == 0){
					  f.new_cases = 0;
					  f.cum_cases = f.value;
					  tot_prev_years = 0;
				  }else if(i > 0){
					  if(f.year == prev_yr){//if in same year
				  
						  /*if(f.value+tot_last_year < cum_cases){
							  console.log(f.report_date)
							  console.log(f.value + " " +tot_last_year+" "+cum_cases);}*/
				  		  f.new_cases = (f.value != null) ? f.value-cum_cases_orig : 0;
						  //f.new_cases = (f.value != null) ? f.value+tot_prev_years-cum_cases : 0; //calc number of new cases
					  	  f.cum_cases = (f.value != "NA") ? f.value + tot_prev_years : tot_prev_years;
					  }else{//else across years
						  tot_prev_years = cum_cases;			  
					  	  f.new_cases = (f.value != null) ? f.value : 0;
						  f.cum_cases = (f.value != "NA") ? f.value + tot_prev_years : tot_prev_years;
					  }
				  }
				  //num = f.value;
				  prev_yr = f.year;
				  cum_cases = f.cum_cases; 
				  cum_cases_orig = f.value;
		  	  })
			  	e.max_cum_cases = d3.max(e.values, function(f){return f.cum_cases;});
				e.max_cum_cases_orig = d3.max(e.values, function(f){return f.value;});
				//hopefully not too expensive
				e.values.forEach(function(f,i){
					f.max_cum_cases = e.max_cum_cases;
					f.max_cum_cases_orig = e.max_cum_cases_orig;
				});
			   	//console.log(max_cum_cases);
			   	//d3.max(d,function(f){return f.cum_cases;
		  	});
		  });
		  
		  //console.log(byRegion);
		  
		  var totalByRegion = d3.nest()
		  .key(function(d){return d.fips;})
		  .rollup(function(v){
			  var t = byRegion.filter(function(e){return e.key == v[0].fips;});
			  var _pop = censusdata.filter(function(j){return j.fips == v[0].fips});
			  var pop = (_pop[0]!=undefined) ? _pop[0].population/100000 : 1;
			  //console.log(pop);
			  var max = 0;
			  var m = 0;
			  t.forEach(function(f,i){
				  //console.log(f.values);
				  f.values.forEach(function(g){
					  //console.log(g.values);
					  m = d3.max(g.values,function(h){return h.new_cases;});
					  max = (max > m) ? max : m;
				  })
			  })
	  
			  return {
				  //this is actually inaccurate because numbers reset each year
			    max_val: d3.max(v,function(f){return f.value;}),
				max_cumulative_orig: d3.max(v,function(f){return f.value;}),
				//max_cumulative: d3.max(v,function(f){return f.cum_cases;}),
				max_new: max,
				//cum_ht: d3.max(v,function(f){return f.cum_cases;})/pop,
				cum_ht_orig: d3.max(v,function(f){return f.value;})/pop,
				new_ht: max/pop,
				  _pop: pop    
			  };
		  })
		  .entries(epidata_all);	  
	  /***********end format data************/ 
	  
	  
	  //country variable
	  var ADM0 = "SLV";//"DOM";//"COL";//"HTI";//"COL";//"SLV";
	  var FIPS0 = "ES00";
	  var country_adm1_features; //prev el_salvador
	  var country_centroid;
	  var country_pop;
	  var country_places;
	  var country_pov;
	  var country_awards;
	  var country_povbyfips;
	  var country_povbyfips2;
	  var country_byDatebyRegion;
	  //global variables
	  var regions;
	  var sm_maps;	
	  var efforts;
	  var clinics;
	  var country_indicators;
	  var all_inds;
	  var all_inds_key;
	  var valueLine3;
	  var domains;
	  var mx_c = d3.max(epidata_all, function(v) { return v.value; });
	  var selection = false;
	  var country_title = "El Salvador";
	  var paho_sub;
	  var c_scale;
	  var prev_menu;
	  var bc_dx;
	  var bc_dy;
	  
	  //var global_indicators_1;
	  //var global_indicators_2;
	  
	 var max_pop;
	 var min_pop;
	 var pop_range;
	 
	 //for zooming
	 var dx;
	 var dy;
	 
	 var mx_c_ht;
	 var choropleth4_ht;
	 var global_choropleth;
	 var global_choropleth_ht;
	 var country_choropleth;
	 var country_choropleth_ht;
	  
 	var mx = d3.max(globaldata,function(f){return f.autochthonous_cases_confirmed;});
 	var	mn = d3.min(globaldata,function(f){return f.autochthonous_cases_confirmed;});
	
 	var mx_ht = d3.max(globaldata,function(f){return f.autochthonous_cases_confirmed/f.pop_x_1000;});
 	var	mn_ht = d3.min(globaldata,function(f){return f.autochthonous_cases_confirmed/f.pop_x_1000;});  
	  
 	
	var plotRange = globaldata;
	plotRange.sort(function(a,b){return a.autochthonous_cases_confirmed - b.autochthonous_cases_confirmed;});

	
	choropleth_global = d3.scaleLog()
 	.domain([0.1,100,500,1000,5000,10000,mx])
	//.range([d3.interpolateOrRd(0),d3.interpolateOrRd(1)]);
 	.range(d3.schemeReds[7]);
	
 	choropleth_global_ht = d3.scaleLog()
 	.domain([0.001,mx_ht])
 	.range(['#fef0d9', '#b30000']);	  
	
choropleth4 = d3.scaleLog()
.domain([0.1,10,50,100,500,1000,5000])
	  .range(d3.schemeReds[7]);	 
	  
choropleth4_ht = d3.scaleLog()
.domain([0.1,0.5,1,5,10,50,100,500])
	  .range(d3.schemeReds[8]);	  
	
	color4 = d3.scaleThreshold()
    .domain([1, 5, 10, 50, 100, 500, 1000, 5000, 25000])
	.range(d3.schemeReds[9]);
	
	color_global = d3.scaleThreshold()
    .domain([1, 50, 100, 500, 1000, 10000, 50000, 100000, 150000])
	.range(d3.schemeReds[9]);
	//schemeReds
	//schemeOrRd
	global_choropleth = choropleth_global;//color_global;
	global_choropleth_ht = color_global;
	
	country_choropleth = choropleth4;//color4;
	country_choropleth_ht = choropleth4_ht;//color4;
	 
	 //draw_country_view();
	 draw_global_view();
	 
	 var bchart_colors = ["#1b9e77","#e6ab02","#7570b3"];
	 
	 function draw_country_view(){
	 drawMenu();  
	 setLeaflet();
 	//overview_tab.selected = true;
 	//temporalview_tab.selected = false;
	 setCountry(ADM0);
	 }
	 
	 function setLeaflet(){
	 //need to set this up here
	 over_view = d3.select("#mapview").append("div")
	 	.attr("id","overview");
		
	 d3.select("#mapview").append("svg")
		.attr("width","200px")
		.attr("height","100px")
		.attr("x",375)
		.attr("y",10)
		.attr("id","legend_svg");
	
	 country_map = L.map('overview'/*,{drawControl: true}*/).setView([14, -89], 7)		
	 	.addLayer(new L.TileLayer("http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png?access_token={accessToken}",{
			id: 'your.mapbox.project.id',
    		accessToken: 'your.mapbox.public.access.token'
			//onEachFeature: onEachFeature
	 	}));
		
		init();
		
		//var footnotes = new L.FeatureGroup();
		
		/*footnote_data.each(function(d,i){
			console.log(d);
		})*/
		
		/*for(i = 0; i < footnote_data.length; i++){
			console.log(footnote_data[i]);
			//var marker = L.marker([])
		}*/
		
		//country_map.addLayer(footnotes);
		
		/*var drawnItems = new L.FeatureGroup();
		     
			 country_map.addLayer(drawnItems);
		     var drawControl = new L.Control.Draw({
		         edit: {
		             featureGroup: drawnItems
		         }
		     });
		     
			 country_map.addControl(drawControl);*/
		
		
		/*country_map.on('contextmenu',function(e){
			var marker = new L.marker(e.latlng).bindPopup('<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+
              //...
              '<div class="form-group">'+
                  '<textarea class="form-control" rows="6" id="descrip" name="descript">add comment</textarea>'+
              '</div>'+
              '<div class="form-group">'+
                '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'+
              '</div>'+
              '</form>').addTo(country_map);
		});*/
			
	  //create temp layer to store new features
	  //create temp layer to store new features
	        var featureGroup = L.featureGroup().addTo(country_map);

	        //create drawing controls and toolbar
	        var drawControl = new L.Control.Draw({
	          draw: {
	            circle: false,
	            marker: true,
	            polyline: false, 
	            polygon: false,
	            rectangle: false
	          }/*,
	         edit: {
	             featureGroup: featureGroup
	         }*/
			  
	        }).addTo(country_map);	
			
		
		country_map.on('draw:created', function(e) {
		          var coords = e.layer._latlng;
		          console.log(coords);
		          var tempMarker = featureGroup.addLayer(e.layer);
		          var popupContent = '<form action="https://docs.google.com/forms/d/e/1FAIpQLSe63rT_PcCjDCMebQ3ToqUU5TH9hacCR1Bcv76c-IY3oC_lZw/formResponse" target="_self" method="POST" id="mG61Hd" onsubmit="">'+//'<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="">'+
		          /*'<div class="form-group">'+
		              '<label class="control-label col-sm-5"><strong>Date: </strong></label>'+
		              '<input type="date" placeholder="Required" id="date" name="date" class="form-control"/>'+ 
		          '</div>'+
		          '<div class="form-group">'+
		              '<label class="control-label col-sm-5"><strong>Gender: </strong></label>'+
		              '<select class="form-control" id="gender" name="gender">'+
		                '<option value="Male">Male</option>'+
		                '<option value="Female">Female</option>'+
		                '<option value="Other">Other</option>'+
		              '</select>'+ 
		          '</div>'+
		          '<div class="form-group">'+
		              '<label class="control-label col-sm-5"><strong>Age: </strong></label>'+
		              '<input type="number" min="0" class="form-control" id="age" name="age">'+ 
		          '</div>'+*/
		          //...
		          '<div class="form-group">'+
		              //'<label class="control-label col-sm-5"><strong>Description: </strong></label>'+
		              '<textarea class="form-control" rows="6" id="entry.997428847" name="entry.997428847">add comment</textarea>'+
		          '</div>'+
		          '<input style="display: none;" type="text" id="entry.603752285" name="entry.603752285" value="'+coords.lat.toFixed(6)+'" />'+
		          '<input style="display: none;" type="text" id="entry.1307082079" name="entry.1307082079" value="'+coords.lng.toFixed(6)+'" />'+
		          '<div class="form-group">'+
		            //'<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn">Cancel</button></div>'+
		            '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" name="M2UYVd">Submit</button></div>'+
		          '</div>'+
		          '</form>';
		          tempMarker.bindPopup(popupContent,{
		            keepInView: true,
		            closeButton: false
		            }).openPopup();

		        /*$("#form").submit(function(e){
		            e.preventDefault();
		            //console.log("didnt submit");
		            //var comment =$("#comment").val();
		            console.log(comment);
				});*/
		      });
			  
			  //class="btn btn-primary trigger-submit"
		
		
			/*function highlightFeature(e) {
			    var layer = e.target;

			    layer.setStyle({
			        weight: 5,
			        color: '#666',
			        dashArray: '',
			        fillOpacity: 0.7
			    });

			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
			    }
			}
			
			function resetHighlight(e) {
			    country_map.resetStyle(e.target);
			}
			
			function onEachFeature(feature, layer) {
			    layer.on({
			        mouseover: highlightFeature,
			        mouseout: resetHighlight,
			    });
			}*/
	 }
	 
	 function draw_global_view(){
		 draw_global_mapview(); 
		 draw_global_chartview();
	 	global_svg.call(gl_zoom);
	 }
	 
//draw global mapview
	 function draw_global_mapview(){
	 	//countries
 	 	var gl_regions;
 	 	var gl_countries;
 	 	var gl_efforts;
		
	  var gl_countries = global_land.selectAll("path")
	      .data(geodata_admin0.features) //generate features from TopoJSON
	  	.enter()
	      .append("path")
	      .attr("id",function(d){return "gl_country"+d.properties.ADM0_A3;})
		//.attr("id",function(d){ console.log("m"); console.log(d); return "gl_country"+d.properties.ADMIN;})
	      .attr("class","country_paths")
	    .attr("d",global_path)
		.attr("basecolor",function(d){
			//if(priority_countries.indexOf(d.properties.ADMIN)==-1){return "rgb(220,220,220)";}
			var c = globaldata.filter(function(v){return v.country == d.properties.ADMIN;});
			if(c[0] != undefined){
				if(ht){
				return global_choropleth_ht(c[c.length-1].autochthonous_cases_confirmed/(c[c.length-1].pop_x_1000));	
				}else{
				return global_choropleth(c[c.length-1].autochthonous_cases_confirmed);	
				}
			}else{
				return "rgb(220,220,220)";
			}
				
		})
		.style("fill", function(d){return d3.select("#gl_country"+d.properties.ADM0_A3).attr("basecolor");})
		.on("mouseover",function(d){
			if(priority_countries.indexOf(d.properties.ADMIN)!=-1){
			d3.select(this).style("fill",hover_color);
			filtercharts(d);
			}
		})
		.on("mouseout",function(d){
			if(priority_countries.indexOf(d.properties.ADMIN)!=-1){
			d3.select(this).style("fill",function(d){
				return d3.select("#gl_country"+d.properties.ADM0_A3).attr("basecolor");
			})
			restorecharts();
			}
		})
		.on("click", function(d){
			if(priority_countries.indexOf(d.properties.ADMIN)!=-1){
				ADM0 = 	d.properties.ADM0_A3;
				d3.select("#"+d.properties.ADMIN.replace(" ","_")+"_0").dispatch("click");
			d3.select("#container").moveToFront();
		 if(overview_tab.selected){
			 d3.select("#overview").style("opacity",1);
		 }		
			}
		});
		
global_svg.append("text")
		.attr("id","tagline")
		.attr("class","mapview_title")
		.attr("x",10)
		.attr("y",365)
		.text("Cumulative Zika cases as of 3/9/2017");
		
		
		var vv = geodata_admin0.features.filter(function(d){return priority_countries.indexOf(d.properties.ADMIN) != -1;});
		
		var gl_labels = global_labels.selectAll("text")
		.data(vv)
		.enter()
		.append("text")
		.attr("class","gl_labels")
		.attr("x",function(d){
			if(d.properties.ADMIN == "Dominican Republic"){
				return global_path.centroid(d)[0]+40;
			}else{
				return global_path.centroid(d)[0];
			}
		})
		.attr("y",function(d){return global_path.centroid(d)[1];})
		.text(function(d){return d.properties.ADMIN;});
		
		var bchart_colors = ["#1b9e77","#e6ab02","#7570b3"];
		  
		 var pp = global_bcharts.selectAll("g")
		  .data(vv)
		  .enter().append("g")
		  .attr("id",function(d){return "gl_bchart_"+d.properties.ADMIN})
		  .attr("transform", function(d) {//console.log(d.geometry.coordinates); 
			  if(d.properties.ADMIN == "Dominican Republic"){
				  var cc = global_path.centroid(d);
				  console.log(cc);
				  return "translate(" +global_path.centroid(d)+ ")";//"translate(["+(cc[0]+100)+","+cc[1]+"])";
			  }else{
				  return "translate(" +global_path.centroid(d)+ ")";
				  }	  
		  		});
		  
		  var sz = 7;
		  
pp.selectAll("svg")  
		  .data(function(d){return partnersbyCountrybyLinebyPartner.filter(function(v){return v.key == d.properties.ADMIN;})[0].values;})
		  .enter()
		  .append("rect")	  	  	  
		  .attr("x",function(d,i,j){
			  if(j[i].parentNode.id.replace("gl_bchart_","")=="Dominican Republic"){
				  return -(sz*2)+i*(sz+0.5)+20;
			  } else{
				  return -(sz*2)+i*(sz+0.5);
			  }})
		  .attr("y",function(d){return -sz-7;})
		  .attr("width",sz)
		  .attr("height",function(d,i,j){
			  return sz;
		  })
		  .style("fill",function(d,i){
			  if(d.key == "Vector Control"){return bchart_colors[0];}
			  if(d.key == "Maternal and Child Health/Service Delivery"){return bchart_colors[1];}
			  if(d.key == "Social and Behavior Change Communication"){return bchart_colors[2];}
		  });
		  
		
	  global_svg.append("g")
	    .attr("class", "legendLog")
	    .attr("transform", "translate(10,375)");

	  var logLegend = d3.legendColor()
		  .shapeWidth(20)
		  .shapeHeight(5)
		  .shapePadding(0.5)
		  .orient('horizontal')
		  .labelOffset(5)
		  .labelFormat(d3.format(""))
		  .cells([1, 5, 10, 50, 100, 500, 1000, 5000, 10000,100000])
	      .scale(choropleth_global);

	  global_svg.select(".legendLog")
	    .call(logLegend);
		
		
		//draw award data
		draw_global_awards(partnersbyLinebyPartner);
		
		 
	}	//end draw country mapview 
function filtercharts(d){
		var dd = globalbycountry.filter(function(c){return c.key == d.properties.ADMIN;});
		if(dd[0]!=undefined){
		draw_new_confirmed_chart(dd);
		draw_cumulative_confirmed_chart(dd);
		draw_by_indicators(dd);
		}
		var da = partnersbyCountrybyLinebyPartner.filter(function(c){return c.key == d.properties.ADMIN;})
		
		if(da[0]!=undefined){
		draw_global_awards(da[0].values);
		}
		
	}
function restorecharts(){
		draw_new_confirmed_chart(globalbycountry);
		draw_cumulative_confirmed_chart(globalbycountry);
		draw_by_indicators(globalbycountry);
		draw_global_awards(partnersbyLinebyPartner);
	}
	
//drawing routines
function draw_global_awards(dat){
		
		d3.select("#gl_awardview").selectAll("*").remove();
		d3.select("#gl_awardview").append("text")
		.text("USAID AWARDS");
		
		var bchart_colors = ["#1b9e77","#e6ab02","#7570b3"];
		
		var awardsDiv = d3.select("#gl_awardview").append("div")
		.attr("class","gl_awards_div");
		
		var award_efforts = awardsDiv.selectAll("svg")
		.data(dat)
		.enter()
		.append("svg")
		.attr("id",function(d,i){return "line_"+i;})
		.attr("class","award_effort");
		
		award_efforts.append("text")
		.text(function(d){return d.key.replace("and","&");})
		.attr("y","10px");
		
		var line_partners = award_efforts.selectAll("g")
			.data(function(d){//console.log(d.values); 
				return d.values;})
		.enter()
		.append("g")
		.attr("id",function(d,i,j){return "line_"+j[i].parentNode.id.replace("line_","");})
		.attr("transform", function(d,i){return "translate(0,"+(i*15+20)+")";});
		
		line_partners.append("rect")
		.attr("width","8px")
		.attr("height","8px")
		.attr("id",function(d){
			var l = d.values[0].values[0].line_of_effort;
			return l+"_"+d.key;
		})
		.attr("basecolor",function(d,i,j){
			var n = j[i].parentNode.id.replace("line_","");
			//console.log(n);
			return bchart_colors[n];
		})
		.attr("fill",function(d){
			return d3.select(this).attr("basecolor");
		})
		.on("mouseover",function(d){
			d3.select(this).attr("fill",hover_color);
			d.values.forEach(function(f){
				var ADM = ADM0_A3_lookup.filter(function(v){return v.key == f.key;});
				if(ADM[0]!=undefined && ADM[0].value !=undefined){
				d3.select("#gl_country"+ADM[0].value).style("fill",hover_color);//dispatch("mouseover");//style("stroke-width","2")//
				}
			});
		})
		.on("mouseout",function(d){
			d3.select(this).attr("fill",function(e){return d3.select(this).attr("basecolor");});
			d.values.forEach(function(f){
				var ADM = ADM0_A3_lookup.filter(function(v){return v.key == f.key;});
				if(ADM[0]!=undefined && ADM[0].value !=undefined){
				//d3.select("#gl_country"+ADM[0].value).dispatch("mouseout");
				//d3.select("#gl_country"+ADM[0].value).style("stroke-width","0.25")
				d3.select("#gl_country"+ADM[0].value).style("fill",function(e){return d3.select("#gl_country"+ADM[0].value).attr("basecolor");});
				}
			});
		});
		
		line_partners.append("text")
		.attr("x","15px")
		.attr("y","8px")
		.text(function(d){return d.key;});		
	}
function draw_global_chartview(){
		draw_new_confirmed_chart(globalbycountry);
		draw_cumulative_confirmed_chart(globalbycountry);
		draw_by_indicators(globalbycountry);	
	}	
function draw_cumulative_confirmed_chart(dat){
		d3.select("#cum_conf").selectAll("*").remove();	
		
  	  var margin = {top: 20, right: 10, bottom: 30, left: 50},
      	width = 300 - margin.left - margin.right,
      	height = 100 - margin.top - margin.bottom;
		
		var x = d3.scaleTime().range([0, width]);
		//var y = d3.scaleLog().range([height, 0]);
		var y = d3.scaleLinear().range([height, 0]);
		
		var valueline = d3.line()
		.x(function(d){return x(d.date);})
		.y(function(d){return y(d.autochthonous_cases_confirmed);})
		//.curve(d3.curveCardinal);
		.curve(d3.curveCatmullRom);
		
		//console.log(d3.max(globalbycountry, function(v){return d3.max(v.values,function(g){return g.autochthonous_cases_confirmed;});}));
		//console.log(globalbycountry);
		
		x.domain(d3.extent(dat[0].values, function(v) {return v.date; }));
		y.domain([d3.min(dat, function(v){return d3.min(v.values,function(g){return g.autochthonous_cases_confirmed;});}),d3.max(dat, function(v){return d3.max(v.values,function(g){return g.autochthonous_cases_confirmed;});})]);
		
		//var gl_inds = d3.select("#newConfirmedData").append("div");
		
	  var global_indicators_1 = d3.select("#cum_conf").append("svg")
		.attr("class","gl_ind_charts")
		.attr("id","gl_inds_cum")	  
 	   	.attr("width", width + margin.left + margin.right)
 	   	.attr("height", height + margin.top + margin.bottom)
	 	.append("g")
 	  	 .attr("transform",
        	"translate(" + margin.left + "," + margin.top + ")");
			
		global_indicators_1.append("text")
			.attr("class","chart_labels")
			.attr("x",-10)
			.attr("y",-10)
			.text("cumulative confirmed cases");
		
		
		var linegraph = global_indicators_1.selectAll("path")
			.data(dat)
			.enter()
			.append("path")
			.attr("id",function(d,i){return "line"+d.key})
			.attr("class","line")
			.style("stroke",function(d,i){return colors[i%colors.length];})
			.style("fill","none")	
			.attr("d", function(d){ 
				//console.log(d.values);
				return valueline(d.values);})
				.on("mouseover",function(d){
					//console.log(d);
					d3.select(this).style("stroke-width",3);
					
					var ADM = ADM0_A3_lookup.filter(function(v){return v.key == d.key;});
					if(ADM[0]!=undefined && ADM[0].value !=undefined){
					//d3.select("#gl_country"+ADM[0].value).dispatch("mouseover");
					d3.select("#gl_country"+ADM[0].value).style("fill",hover_color);
					}
					
				})
				.on("mouseout",function(d){
					d3.select(this).style("stroke-width",0.75);
					
					var ADM = ADM0_A3_lookup.filter(function(v){return v.key == d.key;});
					if(ADM[0]!=undefined && ADM[0].value !=undefined){
					//d3.select("#gl_country"+ADM[0].value).dispatch("mouseout");
					d3.select("#gl_country"+ADM[0].value).style("fill",function(e){return d3.select("#gl_country"+ADM[0].value).attr("basecolor");});
					}
					
				});
		
	  var xaxis = global_indicators_1.append("g")
		.attr("class","axis")	
	      .attr("transform", "translate(0,"+height+")")
		.call(d3.axisBottom(x)
			.ticks(7)
			. tickFormat(d3.timeFormat("%-m/%y")))
			.selectAll("text")	
	          .attr("dy", ".15em");
	  
	  var yaxis = global_indicators_1.append("g")
		.attr("class","axis")	  
         .call(d3.axisLeft(y).ticks(4))	
	}
function draw_new_confirmed_chart(dat){
		
		/*if(global_indicators_2 != undefined){
		d3.select("#gl_inds").selectAll("*").remove();
		}*/	
		d3.select("#new_conf").selectAll("*").remove();	
		
		
  	  var margin = {top: 20, right: 10, bottom: 30, left: 50},
      	width = 300 - margin.left - margin.right,
      	height = 100 - margin.top - margin.bottom;
		
		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);
		
		var valueline = d3.line()
		.x(function(d){return x(d.date);})
		.y(function(d){return y(d.new_autochthonous_cases_confirmed);})
		//.curve(d3.curveCardinal);
		.curve(d3.curveCatmullRom);
		
		//console.log(d3.max(globalbycountry, function(v){return d3.max(v.values,function(g){return g.autochthonous_cases_confirmed;});}));
		//console.log(globalbycountry);
		
		x.domain(d3.extent(dat[0].values, function(v) {return v.date; }));
		y.domain([0,d3.max(dat, function(v){return d3.max(v.values,function(g){return g.new_autochthonous_cases_confirmed;});})]);
		
		//var gl_inds = d3.select("#newConfirmedData").append("div");
		
	  var global_indicators_2 = d3.select("#new_conf").append("svg")
		.attr("class","gl_ind_charts")
		.attr("id","gl_inds")	  
 	   	.attr("width", width + margin.left + margin.right)
 	   	.attr("height", height + margin.top + margin.bottom)
	 	.append("g")
 	  	 .attr("transform",
        	"translate(" + margin.left + "," + margin.top + ")");
			
		global_indicators_2.append("text")
			.attr("class","chart_labels")
			.attr("x",-10)
			.attr("y",-10)
			.text("new confirmed cases");	
		
		
		var linegraph = global_indicators_2.selectAll("path")
			.data(dat)
			.enter()
			.append("path")
			.attr("id",function(d,i){return "line"+d.key})
			.attr("class","line")
			.style("stroke",function(d,i){return colors[i%colors.length];})
			.style("fill","none")	
			.attr("d", function(d){ 
				//console.log(d.values);
				return valueline(d.values);})
				.on("mouseover",function(d){
					//console.log(d);
					d3.select(this).style("stroke-width",3);
					
					var ADM = ADM0_A3_lookup.filter(function(v){return v.key == d.key;});
					if(ADM[0]!=undefined && ADM[0].value !=undefined){
					d3.select("#gl_country"+ADM[0].value).style("fill",hover_color)//dispatch("mouseover");
					}
					
				})
				.on("mouseout",function(d){
					d3.select(this).style("stroke-width",0.75);
					
					var ADM = ADM0_A3_lookup.filter(function(v){return v.key == d.key;});
					if(ADM[0]!=undefined && ADM[0].value !=undefined){
					d3.select("#gl_country"+ADM[0].value).style("fill",function(e){return d3.select("#gl_country"+ADM[0].value).attr("basecolor");});//dispatch("mouseout");
					}
					
				});
		
	  var xaxis = global_indicators_2.append("g")
		.attr("class","axis")	
	      .attr("transform", "translate(0,"+height+")")
		.call(d3.axisBottom(x)
			.ticks(7)
			. tickFormat(d3.timeFormat("%-m/%y")))
			.selectAll("text")	
	          .attr("dy", ".15em");
	  
	  var yaxis = global_indicators_2.append("g")
		.attr("class","axis")	  
         .call(d3.axisLeft(y).ticks(4))	
	}	
function draw_by_indicators(dat){
		
		//console.log(dat);
	
	
		d3.select("#byIndicatorData").selectAll("*").remove();	
		
		d3.select("#byIndicatorData").append("text")
		.text("BY INDICATOR")
		.attr("class","subtitle");	
	  //pass filtered data	
		//console.log(globalbycountry);
		
			
  	  var margin = {top: 20, right: 10, bottom: 30, left: 50},
      	width = 175 - margin.left - margin.right,
      	height = 100 - margin.top - margin.bottom;
		
		var x = d3.scaleTime().range([0, width]);
		//var y = d3.scaleLog().range([height, 0]);
		var y = d3.scaleLinear().range([height, 0]);
		
		var valueline = d3.line()
		.x(function(d){return x(d.date);})
		.y(function(d){
			var i = d.current_ind;
			//console.log(i);
			y.domain([doms_min[i],doms[i]]);
			
			if(i==0){
			return y(d.autochthonous_cases_confirmed);
			}else
			if(i==1){
			return y(d.autochthonous_cases_suspected);
			}else
			if(i==2){
			return y(d.confirmed_congenital_syndrome);
			}else
			if(i==3){
			return y(d.death_among_zika_cases);
			}else
			if(i==4){
			return y(d.imported_cases);
			}else
			if(i==5){
			return y(d.incidence_rate);
			}
		});
			
		
		x.domain(d3.extent(dat[0].values, function(v) {return v.date; }));
		//y.domain([0,d3.max(globalbycountry, function(v){return d3.max(v.values,function(g){return g.autochthonous_cases_confirmed;});})]);
		
		//VARY - have to automate this. 
		var doms = [];
		doms.push(d3.max(dat, function(v){return d3.max(v.values,function(f){return f.autochthonous_cases_confirmed;})}));
		doms.push(d3.max(dat, function(v){return d3.max(v.values,function(f){return f.autochthonous_cases_suspected;})}));
		doms.push(d3.max(dat, function(v){return d3.max(v.values,function(f){return f.confirmed_congenital_syndrome;})}));
		doms.push(d3.max(dat, function(v){return d3.max(v.values,function(f){return f.death_among_zika_cases;})}));
		doms.push(d3.max(dat, function(v){return d3.max(v.values,function(f){return f.imported_cases;})}));
		doms.push(d3.max(dat, function(v){return d3.max(v.values,function(f){return f.incidence_rate;})}));
		
		var doms_min = [];
		doms_min.push(d3.min(dat, function(v){return d3.min(v.values,function(f){return f.autochthonous_cases_confirmed;})}));
		doms_min.push(d3.min(dat, function(v){return d3.min(v.values,function(f){return f.autochthonous_cases_suspected;})}));
		doms_min.push(d3.min(dat, function(v){return d3.min(v.values,function(f){return f.confirmed_congenital_syndrome;})}));
		doms_min.push(d3.min(dat, function(v){return d3.min(v.values,function(f){return f.death_among_zika_cases;})}));
		doms_min.push(d3.min(dat, function(v){return d3.min(v.values,function(f){return f.imported_cases;})}));
		doms_min.push(d3.min(dat, function(v){return d3.min(v.values,function(f){return f.incidence_rate;})}));
		
		
		//y.domain([0,doms[5]]);
		
		//console.log(doms);
		
		var global_indicators_3 = d3.select("#byIndicatorData")
		.selectAll("svg")
		.data(global_indicators)
		.enter().append("svg")
		.attr("class","globalCharts")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("id",function(d,i){return "ind_"+i;})
	    .attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");
		
	global_indicators_3.append("text")
		.attr("class","chart_labels")
		.attr("x",-10)
		.attr("y",-10)
		.text(function(d){return d;});
		
		linegraph = global_indicators_3.selectAll("path")
		.data(dat)
		.enter()
		.append("path")
		.attr("class","line")
		.style("stroke",function(d,i){return colors[i%colors.length];})
		.style("fill","none")
		.attr("d", function(d,i,j){
			k = +j[i].parentNode.id.replace("ind_","");
			//console.log(k);
			
			d.values.forEach(function(c){
				c.current_ind = k;	
			})
			//console.log(d.values);
			//y.domain([0,9000]);
			
			/*var vline = d3.line()
			.x(function(f){return x(f.date);})
			.y(function(f){
				var global_indicators_n = [f.autochthonous_cases_confirmed,f.autochthonous_cases_suspected,f.confirmed_congenital_syndrome,f.death_among_zika_cases,f.imported_cases,f.incidence_rate];
				
				return y(global_indicators_n[i]);
			});*/
			
			//return vline(d.values)
			return valueline(d.values)
		;})
			.on("mouseover",function(d){
				//console.log(d);
				d3.select(this).style("stroke-width",3);
				
				var ADM = ADM0_A3_lookup.filter(function(v){return v.key == d.key;});
				if(ADM[0]!=undefined && ADM[0].value !=undefined){
				//d3.select("#gl_country"+ADM[0].value).dispatch("mouseover");
				d3.select("#gl_country"+ADM[0].value).style("fill",hover_color);
				}
				
			})
			.on("mouseout",function(d){
				d3.select(this).style("stroke-width",0.75);
				
				var ADM = ADM0_A3_lookup.filter(function(v){return v.key == d.key;});
				if(ADM[0]!=undefined && ADM[0].value !=undefined){
				//d3.select("#gl_country"+ADM[0].value).dispatch("mouseout");
				d3.select("#gl_country"+ADM[0].value).style("fill",function(e){return d3.select("#gl_country"+ADM[0].value).attr("basecolor");});
				}
			});
		
		
var xaxis = global_indicators_3.append("g")
.attr("class","axis")	
    .attr("transform", "translate(0,"+height+")")
.call(d3.axisBottom(x)
	.ticks(5)
	.tickFormat(d3.timeFormat("%-m/%y")))		
	.selectAll("text")	
    .attr("dy", ".15em");
		
		
		global_indicators.forEach(function(d,i){
			//var yy = d3.scaleLog().range([height, 0]).domain([0.1,doms[i]]);
			var yy = d3.scaleLinear().range([height, 0]).domain([doms_min[i],doms[i]]);
			
			d3.select("#ind_"+i+"").append("g")
			.attr("class","axis")
			.call(d3.axisLeft(yy).ticks(4));
			
		})
		
	}	 
  
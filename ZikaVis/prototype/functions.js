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
			d.values.forEach(function(c){
				c.current_ind = k;	
			})
			return valueline(d.values);
		})
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
			
		});
		
}
  
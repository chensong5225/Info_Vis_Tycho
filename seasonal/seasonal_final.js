var diseases = ['DIPHTHERIA', 'MUMPS', 'SMALLPOX', 'MEASLES', 'HEPATITIS A', 'RUBELLA', 'PERTUSSIS', 'POLIO'];
var diseases2 = ['DIPHTHERIA', 'MUMPS', 'SMALLPOX', 'MEASLES', 'HEPATITIS', 'RUBELLA', 'PERTUSSIS', 'POLIO'];

var month = ['JAN'," "," "," ",'FEB'," "," "," ",'MAR'," "," "," "," ",
'APR'," "," "," ",'MAY'," "," "," "," ",'JUN'," "," "," ",
'JUL'," "," "," "," ",'AUG'," "," "," ",'SEP'," "," "," ",
'OCT'," "," "," ",'NOV'," "," "," ",'DEC'," "," "," "," "];

d3.json("data_week_state.json").get(function(error, data){

  //console.log(data);

  var tooltip = d3.select("body")
      .append('div')
      .attr('class', 'tooltip');

  tooltip.append('div')
      .attr('class', 'week');
  tooltip.append('div')
      .attr('class', 'cases');
  tooltip.append('div')
      .attr('class', 'rate');

  var domain = [0, 5000]

//DIPHTHERIA
  var DIPHTHERIA = [];
  var year_D = [];

  for(var year = 1916; year<=1949; year++){

    var temp = data["DIPHTHERIA"][year];
    temp.forEach(function(d) {
      DIPHTHERIA.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_D.push(year) : year_D.push('');
  }

  var domain_D = d3.extent(DIPHTHERIA, function(d){return d.cases; });

  var chart_D = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_D);

  chart_D.accessor(function(d) {return d.cases;});

  var svg1 = d3.select('div#'+"DIPHTHERIA")//
      .selectAll('svg')
      .data([DIPHTHERIA])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_D);

//MUMPS
  var MUMPS = [];
  var year_M = [];

  for(var year = 1965; year<=1998; year++){

    var temp = data["MUMPS"][year];
    temp.forEach(function(d) {
      MUMPS.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_M.push(year) : year_M.push('');
  }

  var domain_M = d3.extent(MUMPS, function(d){return d.cases; });

  var chart_M = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_M);

  chart_M.accessor(function(d) {return d.cases;});

  var svg2 = d3.select('div#'+"MUMPS")//
      .selectAll('svg')
      .data([MUMPS])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_M);

//SMALLPOX
  var SMALLPOX = [];
  var year_S = [];

  for(var year = 1925; year<=1958; year++){

    var temp = data["SMALLPOX"][year];
    temp.forEach(function(d) {
      SMALLPOX.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_S.push(year) : year_S.push('');
  }

  var domain_S = d3.extent(SMALLPOX, function(d){return d.cases; });

  var chart_S = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_S);

  chart_S.accessor(function(d) {return d.cases;});

  var svg3 = d3.select('div#'+"SMALLPOX")//
      .selectAll('svg')
      .data([SMALLPOX])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_S);


//MEASLES
  var MEASLES = [];
  var year_ME = [];

  for(var year = 1928; year<=1981; year++){

    var temp = data["MEASLES"][year];
    temp.forEach(function(d) {
      MEASLES.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_ME.push(year) : year_ME.push('');
  }

  var domain_ME = d3.extent(MEASLES, function(d){return d.cases; });

  var chart_ME = circularHeatChart()
      .segmentHeight(2.5)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_ME);

  chart_ME.accessor(function(d) {return d.cases;});

  var svg4 = d3.select('div#'+"MEASLES")//
      .selectAll('svg')
      .data([MEASLES])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_ME);

//HEPATITIS A
  var HEPATITIS = [];
  var year_H = [];

  for(var year = 1966; year<=2011; year++){

    var temp = data["HEPATITIS A"][year];
    temp.forEach(function(d) {
      HEPATITIS.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_H.push(year) : year_H.push('');
  }

  var domain_H = d3.extent(HEPATITIS, function(d){return d.cases; });

  var chart_H = circularHeatChart()
      .segmentHeight(2.95)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_H);

  chart_H.accessor(function(d) {return d.cases;});

  var svg5 = d3.select('div#'+"HEPATITIS")//
      .selectAll('svg')
      .data([HEPATITIS])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_H);

//RUBELLA
  var RUBELLA = [];
  var year_R = [];

  for(var year = 1965; year<=1998; year++){

    var temp = data["RUBELLA"][year];
    temp.forEach(function(d) {
      RUBELLA.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_R.push(year) : year_R.push('');
  }

  var domain_R = d3.extent(RUBELLA, function(d){return d.cases; });

  var chart_R = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_R);

  chart_R.accessor(function(d) {return d.cases;});

  var svg6 = d3.select('div#'+"RUBELLA")//
      .selectAll('svg')
      .data([RUBELLA])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_R);

//PERTUSSIS
  var PERTUSSIS = [];
  var year_P = [];

  for(var year = 1938; year<=2010; year++){

    var temp = data["PERTUSSIS"][year];
    temp.forEach(function(d) {
      PERTUSSIS.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_P.push(year) : year_P.push('');
  }

  var domain_P = d3.extent(PERTUSSIS, function(d){return d.cases; });

  var chart_P = circularHeatChart()
      .segmentHeight(1.9)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_P);

  chart_P.accessor(function(d) {return d.cases;});

  var svg7 = d3.select('div#'+"PERTUSSIS")//
      .selectAll('svg')
      .data([PERTUSSIS])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_P);

//POLIO
  var POLIO = [];
  var year_PO = [];

  for(var year = 1928; year<=1961; year++){

    var temp = data["POLIO"][year];
    temp.forEach(function(d) {
      POLIO.push({week: year+"-"+d.week, cases: d.cases, rate: d.rate});
    });

    year % 10 === 0 ? year_PO.push(year) : year_PO.push('');
  }

  var domain_PO = d3.extent(POLIO, function(d){return d.cases; });

  var chart_PO = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_PO);

  chart_PO.accessor(function(d) {return d.cases;});

  var svg8 = d3.select('div#'+"POLIO")//
      .selectAll('svg')
      .data([POLIO])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_PO);

//loaded graph
  var chart_D_load = circularHeatChart()
      .segmentHeight(8)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_D)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_D);

  chart_D_load.accessor(function(d) {return d.cases;});

  var svga = d3.select('div#'+"DIPHTHERIA"+"-load")//
      .selectAll('svg')
      .data([DIPHTHERIA])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_D_load);

      svga.selectAll("path")
      .on('mouseover', function(d) {
          tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
          tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
          tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
          tooltip.style('display', 'block');
          tooltip.style('opacity',2);
      })
      .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 20) + 'px')
          .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity',0);
      });

  var chart_M_load = circularHeatChart()
      .segmentHeight(8)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_M)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_M);

  chart_M_load.accessor(function(d) {return d.cases;});

  var svgb = d3.select('div#'+"MUMPS"+"-load")//
      .selectAll('svg')
      .data([MUMPS])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_M_load);

      svgb.selectAll("path")
      .on('mouseover', function(d) {
          tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
          tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
          tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
          tooltip.style('display', 'block');
          tooltip.style('opacity',2);
      })
      .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 20) + 'px')
          .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity',0);
      });


  var chart_S_load = circularHeatChart()
      .segmentHeight(8)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_S)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_S);

  chart_S_load.accessor(function(d) {return d.cases;});

  var svgc = d3.select('div#'+"SMALLPOX"+"-load")//
      .selectAll('svg')
      .data([SMALLPOX])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_S_load);

      svgc.selectAll("path")
      .on('mouseover', function(d) {
          tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
          tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
          tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
          tooltip.style('display', 'block');
          tooltip.style('opacity',2);
      })
      .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 20) + 'px')
          .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity',0);
      });


  var chart_ME_load = circularHeatChart()
      .segmentHeight(5)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_ME)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_ME);

  chart_ME_load.accessor(function(d) {return d.cases;});

  var svgd = d3.select('div#'+"MEASLES"+"-load")//
      .selectAll('svg')
      .data([MEASLES])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_ME_load);

      svgd.selectAll("path")
      .on('mouseover', function(d) {
          tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
          tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
          tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
          tooltip.style('display', 'block');
          tooltip.style('opacity',2);
      })
      .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 20) + 'px')
          .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity',0);
      });


  var chart_H_load = circularHeatChart()
      .segmentHeight(5.9)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_H)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_H);

  chart_H_load.accessor(function(d) {return d.cases;});

  var svge = d3.select('div#'+"HEPATITIS"+"-load")//
      .selectAll('svg')
      .data([HEPATITIS])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_H_load);

      svge.selectAll("path")
      .on('mouseover', function(d) {
          tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
          tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
          tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
          tooltip.style('display', 'block');
          tooltip.style('opacity',2);
      })
      .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 20) + 'px')
          .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity',0);
      });


  var chart_R_load = circularHeatChart()
      .segmentHeight(8)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_R)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_R);

  chart_R_load.accessor(function(d) {return d.cases;});

  var svgf = d3.select('div#'+"RUBELLA"+"-load")//
      .selectAll('svg')
      .data([RUBELLA])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_R_load);

      svgf.selectAll("path")
      .on('mouseover', function(d) {
          tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
          tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
          tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
          tooltip.style('display', 'block');
          tooltip.style('opacity',2);
      })
      .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 20) + 'px')
          .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity',0);
      });


  var chart_P_load = circularHeatChart()
      .segmentHeight(3.7)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_P)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_P);

  chart_P_load.accessor(function(d) {return d.cases;});

  var svgg = d3.select('div#'+"PERTUSSIS"+"-load")//
      .selectAll('svg')
      .data([PERTUSSIS])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_P_load);

      svgg.selectAll("path")
      .on('mouseover', function(d) {
          tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
          tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
          tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
          tooltip.style('display', 'block');
          tooltip.style('opacity',2);
      })
      .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 20) + 'px')
          .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity',0);
      });

  var chart_PO_load = circularHeatChart()
      .segmentHeight(8)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain_PO)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_PO);

  chart_PO_load.accessor(function(d) {return d.cases;});

  var svgh = d3.select('div#'+"POLIO"+"-load")//
      .selectAll('svg')
      .data([POLIO])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_PO_load);

  svgh.selectAll("path")
  .on('mouseover', function(d) {
      tooltip.select('.week').html("<b> Week: " + d.week + "</b>");
      tooltip.select('.cases').html("<b> Cases: " + d.cases + "</b>");
      tooltip.select('.rate').html("<b> Rate: " + d.rate+ "</b>");
      tooltip.style('display', 'block');
      tooltip.style('opacity',2);
  })
  .on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 20) + 'px')
      .style('left', (d3.event.layerX - 25) + 'px');
  })
  .on('mouseout', function(d) {
      tooltip.style('display', 'none');
      tooltip.style('opacity',0);
  });

//transform
  document.querySelector("div#DIPHTHERIA").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#DIPHTHERIA-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

  document.querySelector("div#MUMPS").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#MUMPS-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

  document.querySelector("div#SMALLPOX").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#SMALLPOX-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

  document.querySelector("div#MEASLES").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#MEASLES-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

  document.querySelector("div#HEPATITIS").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#HEPATITIS-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

  document.querySelector("div#RUBELLA").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#RUBELLA-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

  document.querySelector("div#PERTUSSIS").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#PERTUSSIS-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

  document.querySelector("div#POLIO").addEventListener("click", function(){
      document.querySelector("div#first").style.display = "none";
      document.querySelector("div#POLIO-load").style.display = "block";
      document.querySelector("body").style.background = "lightgray";
  });

//go back
  document.querySelector("div#DIPHTHERIA-load").addEventListener("click", function(){
      document.querySelector("div#DIPHTHERIA-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

  document.querySelector("div#MUMPS-load").addEventListener("click", function(){
      document.querySelector("div#MUMPS-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

  document.querySelector("div#SMALLPOX-load").addEventListener("click", function(){
      document.querySelector("div#SMALLPOX-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

  document.querySelector("div#MEASLES-load").addEventListener("click", function(){
      document.querySelector("div#MEASLES-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

  document.querySelector("div#HEPATITIS-load").addEventListener("click", function(){
      document.querySelector("div#HEPATITIS-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

  document.querySelector("div#RUBELLA-load").addEventListener("click", function(){
      document.querySelector("div#RUBELLA-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

  document.querySelector("div#PERTUSSIS-load").addEventListener("click", function(){
      document.querySelector("div#PERTUSSIS-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

  document.querySelector("div#POLIO-load").addEventListener("click", function(){
      document.querySelector("div#POLIO-load").style.display = "none";
      document.querySelector("div#first").style.display = "block";
      document.querySelector("body").style.background = "white";
  });

});

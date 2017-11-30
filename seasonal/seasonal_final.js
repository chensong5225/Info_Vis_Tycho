var diseases = ['DIPHTHERIA', 'MUMPS', 'SMALLPOX', 'MEASLES', 'HEPATITIS A', 'RUBELLA', 'PERTUSSIS', 'POLIO'];
var diseases2 = ['DIPHTHERIA', 'MUMPS', 'SMALLPOX', 'MEASLES', 'HEPATITIS', 'RUBELLA', 'PERTUSSIS', 'POLIO'];

var month = ['JAN'," "," "," ",'FEB'," "," "," ",'MAR'," "," "," "," ",
'APR'," "," "," ",'MAY'," "," "," "," ",'JUN'," "," "," ",
'JUL'," "," "," "," ",'AUG'," "," "," ",'SEP'," "," "," ",
'OCT'," "," "," ",'NOV'," "," "," ",'DEC'," "," "," "," "];

d3.json("data_week_state.json").get(function(error, data){

  //console.log(data);

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

  console.log(domain_D);

  var chart_D = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_D);

  chart_D.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"DIPHTHERIA")//
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

  console.log(domain_M);

  var chart_M = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_M);

  chart_M.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"MUMPS")//
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

  console.log(domain_S);

  var chart_S = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_S);

  chart_S.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"SMALLPOX")//
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

  console.log(domain_ME);

  var chart_ME = circularHeatChart()
      .segmentHeight(2.5)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_ME);

  chart_ME.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"MEASLES")//
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

  console.log(domain_H);

  var chart_H = circularHeatChart()
      .segmentHeight(2.95)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_H);

  chart_H.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"HEPATITIS")//
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

  console.log(domain_R);

  var chart_R = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_R);

  chart_R.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"RUBELLA")//
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

  console.log(domain_P);

  var chart_P = circularHeatChart()
      .segmentHeight(1.9)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_P);

  chart_P.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"PERTUSSIS")//
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

  console.log(domain_PO);

  var chart_PO = circularHeatChart()
      .segmentHeight(4)
      .innerRadius(0)
      .numSegments(52)
      .domain(domain)
      .range(['white', 'red'])
      .segmentLabels(month)
      .radialLabels(year_PO);

  chart_PO.accessor(function(d) {return d.cases;});

  var svg = d3.select('div#'+"POLIO")//
      .selectAll('svg')
      .data([POLIO])
      .enter()
      .append('svg')
      .attr("height","100%")
      .attr("width","100%")
      .call(chart_PO);



});

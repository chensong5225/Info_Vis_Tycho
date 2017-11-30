//try heat map, 1916
disease = "DIPHTHERIA";
year = 1916;

d3.json("../data_week_state.json").get(function(error,data){

  var byDisease = data[disease][year];
  //console.log(byDisease);
  var cases = [];
  var week = [];
  //var rate = [];
  byDisease.forEach(function(d) {
    cases.push(d.cases);
    week.push(d.week);
    //rate.push(d.rate);
  });
  //console.log(cases);

  /* Create the chart */
  var chart = circularHeatChart()
      .segmentHeight(10)
      .innerRadius(100)
      .numSegments(52)
      .domain([700, 1400])
      .range(['white', 'blue'])
      .segmentLabels(week)
      .radialLabels(["1916"]);

  d3.select('body')
      .selectAll('svg')
      .data([cases])
      .enter()
      .append('svg')
      .attr("height",600)
      .attr("width",600)
      .call(chart);

});

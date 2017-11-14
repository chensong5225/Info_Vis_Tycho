disease = "DIPHTHERIA";
year = 1916；

d3.json("data_week_state.json").get(function(error,data){
  var width = 500,
      height = 500,
      start = 0,
      end = 2.25,
      numSpirals = 3
      margin = {top:50,bottom:50,left:50,right:50};

  var theta = function(r) {
      return numSpirals * Math.PI * r;
  };

  var color = d3.scaleOrdinal(d3.schemeCategory10);
  var r = d3.min([width, height]) / 2 - 40;

  var radius = d3.scaleLinear()
     .domain([start, end])
     .range([40, r]);

  var svg = d3.select("#chart").append("svg")
     .attr("width", width + margin.right + margin.left)
     .attr("height", height + margin.left + margin.right)
     .append("g")
     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var points = d3.range(start, end + 0.001, (end - start) / 1000);

  var spiral = d3.radialLine()
    .curve(d3.curveCardinal)
    .angle(theta)
    .radius(radius);

  var path = svg.append("path")
    .datum(points)
    .attr("id", "spiral")
    .attr("d", spiral)
    .style("fill", "none")
    .style("stroke", "steelblue");

  var spiralLength = path.node().getTotalLength(),
    N = 365,
    barWidth = (spiralLength / N) - 1;

var byDisease = data[disease];



});

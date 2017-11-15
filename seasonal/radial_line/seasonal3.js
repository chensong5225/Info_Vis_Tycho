//从json导入，DIPHTHERIA，1916年一条环装线
disease = "DIPHTHERIA";

d3.json("../data_week_state.json").get(function(error,data){
  var byDisease = data[disease];

  var height = 600;
  var width = 600;
  var margin = {left:50, right:50, top:40, bottom:0};
  var caseDomain = [0, 10402];
  var weekDomain = [1, 52];

  var distScale = d3.scale.linear()
    .range([0,300])
    .domain(caseDomain);

  var radian = d3.scale.linear()
    .range([0, Math.PI*2])
    .domain(weekDomain);

  var year = 1926;

  var line = d3.svg.line.radial()
    .angle(function(d){ return radian(d.week); })
    .radius(function(d){ return distScale(d.cases); });

  //console.log(byDisease[year][0].week);

  var svg = d3.select("body").append("svg").attr("height",600).attr("width",600);

  var g = svg.append("g").attr("transform","translate(300,300)");

  var path = g.append("path")
                .attr("d",line(byDisease[year]))
                //.attr("x", -0.75)
                //.style("stroke", "url(#radial-gradient)");

});

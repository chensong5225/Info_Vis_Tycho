//从json导入，DIPHTHERIA，每年一条线
d3.json("../data_week_state.json").get(function(error,data){

//   var diphtheria = data.DIPHTHERIA;
//
// //  diphtheria.forEach(function(d){
//     //console.log(d.);
//   //})
//   console.log(diphtheria[1916]);
//   diphtheria.forEach(function(d)
// {
//   console.log(d)
// })
  //var dip = data.DIPHTHERIA;

  //var year = 1916;

  var height = 500;
  var width = 960;
  var margin = {left:50, right:50, top:40, bottom:0};
  var caseDomain = [0, 10402];
  var timeDomain = [1, 52];
  //console.log(timeDomain);

  var x = d3.scaleLinear().domain(timeDomain).range([0,width]);
  var y = d3.scaleLinear().domain(caseDomain).range([height,0]);

  for(var year=1916; year<=2010; year++){
    var dataYear = data.DIPHTHERIA[year];
    //console.log(data);



    // var xAxis = d3.axisBottom(x);
    // var yAxis = d3.axisLeft(y);

    var svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%");

    //var g = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

    var line = d3.line()
        .x(function(d){ return x(d.week)})
        .y(function(d){ return y(d.cases)});

    svg.append("path").attr("d",line(dataYear)).attr("fill","none").attr("stroke-width",2).attr("stroke","black");
  }

});

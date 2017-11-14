//从csv导入，1916年DIPHTHERIA，一条线
d3.csv("data_week.csv")
  .row(function(d){ return {disease:d.disease, year:Number(d.year), week:Number(d.week), cases:Number(d.cases)}; })
  .get(function(error,data){
    //console.log(data);
    //var data = data[d.disease=="DIPHTHERIA"];
    console.log(data);
    var height = 500;
    var width = 960;
    var margin = {left:50, right:50, top:40, bottom:0};

    var caseDomain = d3.extent(data,function(d){ return d.cases; });
    var timeDomain = d3.extent(data,function(d){ return d.year*100+d.week; });
    //console.log(timeDomain);

    var x = d3.scaleLinear().domain(timeDomain).range([0,width]);
    var y = d3.scaleLinear().domain(caseDomain).range([height,0]);

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var svg = d3.select("body").append("svg").attr("width",width).attr("height",height);

    var g = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

    var line = d3.line()
        .x(function(d){ return x(d.year*100+d.week)})
        .y(function(d){ return y(d.cases)});

    g.append("path").attr("d",line(data));


  })

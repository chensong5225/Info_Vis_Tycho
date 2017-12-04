var startDate = 1987,
    endDate = 2011;

var margin = {top:0, right:50, bottom:0, left:50},
    width = 960 - margin.left - margin.right,
    height = 700;

    var margins = {
        "left": 80,
            "right": 30,
            "top": 20,
            "bottom": 80
    };

var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);  

var c_num = [5000,3000,1000,200]
var rateByname = d3.map();
var numByname = d3.map();
var gdprange = [20000,80000]
raterange_conf = {'MUMPS':[0,0.15] ,'MEASLES':[0,0.5] ,'HEPATITIS A':[0,0.5] ,
'RUBELLA':[0,0.1] ,'PERTUSSIS':[0,0.2],'POLIO':[0,0.2]}
var raterange = [0,0.01]

////////// slider /////////

color_config = [
    '#fff7ec',
    '#fee8c8',
    '#fdd49e',
    '#fdbb84',
    '#fc8d59',
    '#ef6548',
    '#d7301f',
    '#b30000',
    '#7f0000'
]

var flag = -1;
  bound = [0,0.01,0.02,0.04,0.08,0.15,0.3,0.8,1.5]
  diseasegroup = ['MUMPS', 'MEASLES', 'HEPATITIS A', 'RUBELLA', 'PERTUSSIS', 'POLIO']
  diseasegroup.forEach(function(d){
  document.getElementById('disease').options.add(new Option(d,d));
})
var moving = false;
var currentValue = 0;
var targetValue = width;
var scale = 8
var w = 20
var SCALE = 1000 //control size of map
var playButton = d3.select("#play-button");
    

var usDataUrl = "script/map/us-states.json",
    citiesDataUrl = 'script/map/data_year_city.json';
var code2name = d3.map()
var rateByname = d3.map();
var numByname = d3.map();


d3.tsv("script/map/us-state-names.tsv", function(error, name) {
  name.forEach(function(d) {
          code2name.set(d['code'], d['name']);
        });
       }); //d3.tsv


var x = d3.scaleLinear()
      .domain([startDate,endDate])  
      .range([0,targetValue])
      .clamp(true);; 

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + 40 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() {
   return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          //console.log(currentValue)
          currentValue = d3.event.x;
          update(x.invert(currentValue),disease); 
        })
    );


slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d; });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(startDate)
    .attr("transform", "translate(0," + (-25) + ")")
var x_Axis;
var y_Axis;
updatescatter()
legend()
////////// plot //////////

var dataset;
var disease = 'MUMPS';
var plot = svg.append("g")
    .attr("class", "plot")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function updatescatter(){
    d3.json('data/data_state_gdp.json',function(error,data){
          if (error) throw error;
    dataset = data;
    disease = document.getElementById("disease").value;
    plotcoordinate(disease)
    plotscatter(data[disease][startDate])


    playButton
      .on("click", function() {
      var button = d3.select(this);
      if (button.text() == "Pause") {
        moving = false;
        clearInterval(timer);
        // timer = 0;
        button.text("Play");
      } else {
        moving = true;
        timer = setInterval(step, 140);
        button.text("Pause");
      }
      console.log("Slider moving: " + moving);
    })
  })
}

function step() {
  console.log(disease)
  update(x.invert(currentValue),disease);
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
    console.log("Slider moving: " + moving);
    update(x.invert(currentValue),disease)
  }
}


function update(h,disease) {
  y = Math.floor(h)
  console.log("in update d is ",disease,'year is ',y)
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(y);
  newData = dataset[disease][y]
  updateplot(newData)
}

function plotcoordinate(disease)
{
        x_Axis = d3.scaleLinear()
            .domain(gdprange)
            .range([0, width - margins.left - margins.right]);
        y_Axis = d3.scaleLinear()
            .domain(raterange_conf[disease])
            .range([height - margins.top - margins.bottom -200, 0]);
        
        svg.append("g").attr("class", "x axis").attr("transform", "translate(100," + (y_Axis.range()[0] +100)+ ")");
        svg.append("g").attr("class", "y axis").attr("transform", "translate(100," + 100 + ")");

        // this is our X axis label. Nothing too special to see here.
        svg.append("text")
            .attr("fill", "#414241")
            .attr("text-anchor", "end")
            .style('font-size','20px')
            .attr("x", width / 2+100)
            .attr("y", height - margins.top - margins.bottom -50)
            .text("GDP");
    svg.append("g")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("dx", -100)
      .attr("dy", 50)
      .style("text-anchor", "end")
      .text("Incidence Rate(%)");

    // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
    var xAxis = d3.axisBottom(x_Axis).tickPadding(5);
    var yAxis = d3.axisLeft(y_Axis).tickPadding(5);

    // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.    
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);
}

function plotscatter(data)
{
    console.log(data)
    data.forEach(function(d){
      rateByname.set(d.state, d.rate);
      numByname.set(d.state, d.cases);
    }) 
    svg.selectAll('g.node').remove();
    //console.log(data)
    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
    
    var year;
    var nodes = svg.selectAll("g.node").data(data, function (d) {
        year = d.year;
        return d.state;
    });

    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
    
    var nodesGroup = nodes.enter().append("g").attr("class", "node")
    // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items 
    .attr('transform', function (d) {
        return "translate(" + (100+x_Axis(d.gdp))  + "," + (y_Axis(d.rate)+100) + ")";
    });

    // we add our first graphics element! A circle! 
    nodesGroup.append("circle")
        .attr("r",function(d) {
        if(d.cases!=0)
            return Math.sqrt(d.cases)+2;
        else
            return 0;
    })
        .attr("class", "dot")
        .style("fill", function(d)
            {
              return color_config[5]

            })
        .on("mousemove",function(d) {

                $(this).attr("fill-opacity", "0.8");
                mousemovemap(d,rateByname,numByname,year)})
        .on("mouseout", function() {
          $(this).attr("fill-opacity", "1.0");
          $("#tooltip-container").hide();
        });

    // now we add some text, so we can see what each item is.
    nodesGroup.append("text")
        .style("text-anchor", "middle")
        .attr("dy",function(d) {return -Math.sqrt(d.cases)-5})
        .style("font-size",function(d){ if(d.cases == 0) return 0;})
        .text(function (d) {
          if(d.cases > 0)
            return d.state;
    });
}

function updateplot(data)
{
    
    var year;
    data.forEach(function(d){
      rateByname.set(d.state, d.rate);
      numByname.set(d.state, d.cases);
      year = d.year;
    })
    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
    var nodes = svg.selectAll("g.node")

    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
    
    var nodesGroup = svg.selectAll("g.node")
      .data(data)
    // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items 
    nodesGroup.transition()
      .attr('transform', function (d) {
          return "translate(" + (100+x_Axis(d.gdp)) + "," + (y_Axis(d.rate)+100) + ")";
    });

    // we add our first graphics element! A circle! 
    nodesGroup.selectAll("circle")
        .attr("r",function(d) {
        if(numByname.get(d.state)!=0)
            return Math.sqrt(numByname.get(d.state))+2;
        else
            return 0;
    })
        .attr("class", "dot")
        .style("fill", function(d)
            {
              return color_config[5]
            })
        .on("mousemove",function(d) {
                $(this).attr("fill-opacity", "0.8");
                mousemovemap(d,rateByname,numByname,year)})
        .on("mouseout", function() {
          $(this).attr("fill-opacity", "1.0");
          $("#tooltip-container").hide();
        });


    nodesGroup.selectAll("text").remove();
    // now we add some text, so we can see what each item is.
    // chocolateGroup.selectAll("text")
    //     .transition()
    //     .style("text-anchor", "middle")
    //     .attr("dy",function(d) {return -Math.sqrt(numByname.get(d.state))-5})
    //     .text(function (d) {
    //       if(d.cases > 0)
    //         return d.state;
    // });
        nodesGroup.append("text")
        .style("text-anchor", "middle")
        .attr("dy",function(d) {return -Math.sqrt(d.cases)-5})
        .style("font-size",function(d){ if(d.cases == 0) return 0;})
        .text(function (d) {
          if(d.cases > 0)
            return d.state;
    });
}

function mousemovemap(d,rbn,nbn,y) {

      var html = "";

      html += "<div class=\"tooltip_kv\">";
      html += "<span class=\"tooltip_key\">";
      html += code2name.get(d.state)+'('+y+')';

      html += "</span>";
      html += "<span class=\"tooltip_value\">";
      html += "Incidence Rate: "+rbn.get(d.state)+"%";
      html += "<br>";
      html += "Cases: "+nbn.get(d.state);
      html += "";
      html += "</span>";
      html += "</div>";

      $("#tooltip-container").html(html);
      $("#tooltip-container").show();
      d3.select("#tooltip-container")
        .style("top", (d3.event.layerY + 15) + "px")
        .style("left", (d3.event.layerX + 15) + "px");
  }


function legend()
{

var locx = 800
var locy = 200
// svg.append('g')
//     .attr('class','legend')
//     .selectAll('rect')
//     .data(color_config)
//       .enter()
//       .append("rect")
//       .attr("fill", function(d,i) {  return color_config[i]})
//       .attr('x',function(d,i){return locx-270+i*w})
//       .attr('y',locy)
//       .attr('width',w)
//       .attr('height',w)

//   svg.append('g')
//     .attr('class','legend_text')
//     .selectAll('text')
//     .data(bound)
//       .enter()
//       .append("text")
//       .style('font-size','12px')
//       .attr("x",function(d,i) {return locx-270+i*w-0.5*w})
//       .attr("y",function (d,i) {
//             if(i%2 == 1)
//               return locy-0.2*w;
//             else return locy + 1.7*w})
//       .text(function(d,i) {
//         if(i == 8) return '>'+d
//         else
//           return d;})

svg.append('g')
    .attr('class','circle')
    .selectAll('circle')
    .data(c_num)
      .enter()
      .append("circle")
      .style("fill-opacity",0)
      .attr('stroke','black')
      .attr("cx",locx)
      .attr("cy",locy)
      .attr('r',function(d){return Math.sqrt(d)})
svg.append('g')
  .attr('class','circle_text')
  .selectAll('text')
  .data(c_num)
    .enter()
    .append("text")
    .style('font-size','12px')
    .attr('x',function(d,i){
        if(i == 3)
          return locx-10
        else
          return locx-14
    })
    .attr("y",function(d) { 
      return locy-Math.sqrt(d)
  })
    .text(function(d){ return d})
}


var startDate = 1916,
    endDate = 2011;

 margin = {
  "left":50,
  "right":50,
  "top":50,
  "bottom":50
 }
    width = 960 - margin.left - margin.right,
    height = 700;

var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);  

////////// slider //////////
var disease = 'DIPHTHERIA';
var year = 1916;

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
var flag_state = 0;
var flag = -1;
  bound = [0,0.01,0.02,0.04,0.08,0.15,0.3,0.8,1.5]
  diseasegroup = ['DIPHTHERIA', 'MUMPS', 'SMALLPOX', 'MEASLES', 'HEPATITIS A', 'RUBELLA', 'PERTUSSIS', 'POLIO']
  diseasegroup.forEach(function(d){
  document.getElementById('disease').options.add(new Option(d,d));
})
var moving = false;
var currentValue = 0;
var targetValue = width-100;
var scale = 8
var w = 20
var SCALE = 1000 //control size of map
var playButton = d3.select("#play-button");
    

var usDataUrl = "script/map/us-states.json",
    citiesDataUrl = 'script/map/data_year_city.json';
var code2name = d3.map()
var rateByname = d3.map();
var numByname = d3.map();

var projection = d3.geo.albersUsa()
    .translate([width/2, height/2+50])
    .scale([SCALE]);

var x = d3.scaleLinear()
      .domain([startDate,endDate])  
      .range([0,targetValue])
      .clamp(true);; 

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + 80 + ")");

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

 

d3.tsv("script/map/us-state-names.tsv", function(error, name) {
  name.forEach(function(d) {
          code2name.set(d['code'], d['name']);
        });
       }); //d3.tsv

draw()
updatemap()
legend(rateByname)

////////// plot //////////

var dataset;

var plot = svg.append("g")
    .attr("class", "plot")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function updatemap(){
  d3.json("data/data_year_state.json", function(data) {
    dataset = data;
    disease = document.getElementById("disease").value;
    //console.log(disease)
    updatestates(data[disease][year])
    //console.log(disease)
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
        timer = setInterval(step, 100);
        button.text("Pause");
      }
      console.log("Slider moving: " + moving);
    })
  })
}
  
function step() {
  update(x.invert(currentValue),disease);
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
    console.log("Slider moving: " + moving);
  }
}


function update(h,d) {
  y = Math.floor(h)
  console.log("in update d is ",d)
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(y);
  newData = dataset[d][y]
  updatestates(newData);
}

function draw()
{

  queue()
      .defer(d3.json, usDataUrl)
      .await(function (error, states) {
          var path = d3.geo.path();
          path.projection(projection);

          svg.selectAll('path')
              .data(states.features)
              .enter()
              .append('path')
              .attr('d', path)
              .style("stroke","black")
              .style("fill","white")
              // .on('click',function(d,i){
              //   if(flag_state == 0)
              //   {
              //     $(this).css("stroke-width","6")
              //     flag_state = 1
              //   }
              //   else
              //   {
              //     flag_state = 0
              //     $(this).css("stroke-width","1")
              //   }
              // })
      });//await
}//draw


function updatestates(data)
{
    console.log(data)
    data.forEach(function(d){
      rateByname.set(code2name.get(d.state), d.rate);
      numByname.set(code2name.get(d.state), d.cases);
    })

    svg.selectAll("path").transition()
        .delay(100)
        .style("fill",function(d){
          var v = rateByname.get(d.properties.name)
          //console.log(v)
          if(v == 0) return 'white';
          if(v >= bound[8]) return color_config[8];
          for(i = 1;i<scale+1;i++)
          {
            if(v < bound[i])
              return color_config[i-1]
          }
        })
      svg.selectAll("path")
        .on("mousemove",function(d) {
                $(this).attr("fill-opacity", "0.8");
                mousemovemap(d,rateByname,numByname)})
        .on("mouseout", function() {
          $(this).attr("fill-opacity", "1.0");
          $("#tooltip-container").hide();
        });
}
function legend(rbn)
{
svg.append('g')
    .attr('class','legend')
    .selectAll('rect')
    .data(color_config)
      .enter()
      .append("rect")
      .attr("fill", function(d,i) {  return color_config[i]})
      .attr('x',function(d,i){return width/2+i*w+40})
      .attr('y',150)
      .attr('width',w)
      .attr('height',w)
      .on("mouseover",function(d,i){
          legendmouseover(i,rbn)
      })
      .on('mouseout',function(d,i){
          legendmouseout(rbn)
      })
      

  svg.append('g')
    .attr('class','legend_text')
    .selectAll('text')
    .data(bound)
      .enter()
      .append("text")
      .style('font-size','12px')
      .attr("x",function(d,i) {return width/2+i*w-0.5*w+40})
      .attr("y",function (d,i) {
            if(i%2 == 1)
              return 150-0.2*w;
            else return 150 + 1.7*w})
      .text(function(d,i) {
        if(i == 8) return '>'+d
        else
          return d;})
}


function legendmouseover(i,rbn)
{
  v1 = bound[i]
  if(i == scale)
    v2 = 100
  else
    v2 = bound[i+1]
 svg.selectAll("path")
      .style("fill",function(d){
        var v = rbn.get(d.properties.name)
        if(v > v2 || v<v1)
          return 'white';
        else
        {
          if(v == 0) return 'white';
          if(v >= bound[8]) return color_config[8];
          for(i = 1;i<scale+1;i++)
          {
            if(v < bound[i])
              return color_config[i-1]
          }
        }
      })
}
function legendmouseout(rbn)
{
    svg.selectAll("path")
      .style("fill",function(d){
        var v = rbn.get(d.properties.name)
        if(v == 0) return 'white';
        if(v >= bound[8]) return color_config[8];
        for(i = 1;i<scale+1;i++)
        {
          if(v < bound[i])
            return color_config[i-1]
        }
      })
}

function mousemovemap(d,rbn,nbn) {
      var html = "";

      html += "<div class=\"tooltip_kv\">";
      html += "<span class=\"tooltip_key\">";
      html += d.properties.name;

      html += "</span>";
      html += "<span class=\"tooltip_value\">";
      html += "Incidence Rate: "+rbn.get(d.properties.name)+"%";
      html += "<br>";
      html += "Cases: "+nbn.get(d.properties.name);
      html += "";
      html += "</span>";
      html += "</div>";

      $("#tooltip-container").html(html);
      $("#tooltip-container").show();
      d3.select("#tooltip-container")
        .style("top", (d3.event.layerY + 15) + "px")
        .style("left", (d3.event.layerX + 15) + "px");
  }
  // function click(d){
  //   console.log(d)
  // }


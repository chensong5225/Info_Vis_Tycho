
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
    var scale = 8
    bound = [0,0.01,0.02,0.04,0.08,0.15,0.3,0.8,1.5]

    year = 1990
    disease = 'MUMPS';
    diseasegroup = ['MUMPS', 'MEASLES', 'HEPATITIS A', 'RUBELLA', 'PERTUSSIS']
    diseasegroup.forEach(function(d){
      document.getElementById('disease').options.add(new Option(d,d));
    })

    var margins = {
        "left": 80,
            "right": 30,
            "top": 20,
            "bottom": 80
    };
    
    var width = 1200;
    var height = 700;
    var gdprange = [20000,80000]
    raterange_conf = {'MUMPS':[0,0.15] ,'MEASLES':[0,0.5] ,'HEPATITIS A':[0,0.5] ,
    'RUBELLA':[0,0.1] ,'PERTUSSIS':[0,0.2],'POLIO':[0,0.2]}
    var raterange = [0,0.01]
    // this will be our colour scale. An Ordinal scale.
    //var colors = d3.scale.category10();

    // we add the SVG component to the scatter-load div
    var svg = d3.select("div#scatter-load").append("svg").attr("width", width).attr("height", height).append("g")
        .attr("transform", "translate(" + margins.left + "," + (margins.top+50) + ")");

    // this sets the scale that we're using for the X axis. 
    // the domain define the min and max variables to show. In this case, it's the min and max prices of items.
    // this is made a compact piece of code due to d3.extent which gives back the max and min of the price variable within the dataset

var x;
var y;
txt = "Current map shows incidence rate of ";

d3.select("body").select('div#slider').insert("p", ":first-child").append("input")
.style("width","300px")
.attr("type", "range")
.attr("min", "1990")
.attr("max", "2010")
.attr("value", year)
.attr("id", "year");
d3.select("body").insert("h2", ":first-child").text(year)
// call the method below
updatescatter()
function updatescatter(){
    d3.json('data/data_state_gdp.json',function(error,data){
            if (error) throw error;
        var disease = document.getElementById("disease").value;
        x = d3.scaleLinear()
            .domain(gdprange)
            .range([0, width - margins.left - margins.right]);
        y = d3.scaleLinear()
            .domain(raterange_conf[disease])
            .range([height - margins.top - margins.bottom -200, 0]);
        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
        
        svg.append("g").attr("class", "y axis");

        // this is our X axis label. Nothing too special to see here.
        svg.append("text")
            .attr("fill", "#414241")
            .attr("text-anchor", "end")
            .style('font-size','20px')
            .attr("x", width / 2)
            .attr("y", height - margins.top - margins.bottom -150)
            .text("GDP");


    // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
    var xAxis = d3.axisBottom(x).tickPadding(5);
    var yAxis = d3.axisLeft(y).tickPadding(5);

    // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.    
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);
        showScatterPlot(data[disease][year]);

        d3.select("#year").on("input", function() {
            year = this.value;
            d3.select("body").select("h2").text(year)
            showScatterPlot(data[disease][year]);
          });

    })
} 


function showScatterPlot(data) {
    // just to have some space around items. 
    // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit

    svg.selectAll('g.node').remove();
    console.log(data)
    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
    var chocolate = svg.selectAll("g.node").data(data, function (d) {
        return d.state;
    });

    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
    
    var chocolateGroup = chocolate.enter().append("g").attr("class", "node")
    // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items 
    .attr('transform', function (d) {
        return "translate(" + x(d.gdp) + "," + y(d.rate) + ")";
    });

    // we add our first graphics element! A circle! 
    chocolateGroup.append("circle")
        .attr("r",function(d) {
        if(d.cases!=0)
            return Math.sqrt(d.cases)+2;
        else
            return 0;
    })
        .attr("class", "dot")
        .style("fill", function(d)
            {
                if(d.rate == 0) return 'white';
                if(d.rate >= bound[8]) return color_config[8];
                for(i = 1;i<scale+1;i++)
                {
                  if(d.rate < bound[i])
                    return color_config[i-1]
                }

            });

    // now we add some text, so we can see what each item is.
    chocolateGroup.append("text")
        .style("text-anchor", "middle")
        .attr("dy",function(d) {return -Math.sqrt(d.cases)-5})
        .text(function (d) {
            // this shouldn't be a surprising statement.
            return d.state;
    });
}
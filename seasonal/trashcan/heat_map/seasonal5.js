//仍然是heat map，一病一图，分别画svg，加了hover
//http://prcweb.co.uk/lab/circularheat/
//http://bl.ocks.org/arpitnarechania/b0bdc4f9a377ea9d8612677e12f65b82
var diseases = ['DIPHTHERIA', 'MUMPS', 'SMALLPOX', 'MEASLES', 'HEPATITIS A', 'RUBELLA', 'PERTUSSIS', 'POLIO'];
var month = [1,".",".",".",2,".",".",".",3,".",".",".",".",
4,".",".",".",5,".",".",".",".",6,".",".",".",
7,".",".",".",".",8,".",".",".",9,".",".",".",
10,".",".",".",11,".",".",".",12,".",".",".","."];
var week = [];
for(var i=1; i<=52; i++) week[i] = i;

d3.json("../data_week_state.json").get(function(error,data){

  for(var i=1; i<diseases.length; i++){

    var byDisease = data[diseases[i]];

    var cases = [];
    var year = [];

    for(var j = 1968; j<=2010; j++){

      var temp = byDisease[j];
      temp.forEach(function(d) {
        cases.push({c:Math.sqrt(3*d.cases)});
        //week.push(d.week);
      });

      j % 10 === 0 ? year.push(j) : year.push('');
    }
    console.log([cases]);

    var chart = circularHeatChart()
        .segmentHeight(5)
        .innerRadius(50)
        .numSegments(52)
        .domain([0, 100])
        .range(['white', 'red'])
        .segmentLabels(month)
        //.segmentLabels(week)
        .radialLabels(year);


    chart.accessor(function(d) {return d.c;})

    var svg = d3.select('body')
        .selectAll('svg')
        .data([cases])
        .enter()
        .append('svg')
        .attr("height","100%")
        .attr("width","100%")
        .call(chart);

    var tooltip = d3.select("body")
        .append('div')
        .attr('class', 'tooltip');

    tooltip.append('div')
        .attr('class', 'cases');

    svg.selectAll("path")
    .on('mouseover', function(d) {
        //tooltip.select('.year').html("<b> Month: " + d.month + "</b>");
        //tooltip.select('.week').html("<b> Type: " + d.type + "</b>");
        tooltip.select('.cases').html("<b> Value: " + d.c + "</b>");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);
    })
    .on('mousemove', function(d) {

        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function(d) {
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });


    break;
  }




});

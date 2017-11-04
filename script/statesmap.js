
        var width = 1000, height = 500;
        var svg = d3.select('body')
            .append('svg')
            .attr({
                width: width,
                height: height
            });

       var usDataUrl = 'https://gist.githubusercontent.com/d3byex/65a128a9a499f7f0b37d/raw/176771c2f08dbd3431009ae27bef9b2f2fb56e36/us-states.json',
            citiesDataUrl = 'https://gist.githubusercontent.com/d3byex/65a128a9a499f7f0b37d/raw/176771c2f08dbd3431009ae27bef9b2f2fb56e36/us-cities.csv';

        queue()
            .defer(d3.json, usDataUrl)
            .defer(d3.csv, citiesDataUrl)
            .await(function (error, states, cities) {
                var path = d3.geo.path();
                var projection = d3.geo.albersUsa()
                    .translate([width / 2, height / 2])
                    .scale([1000]);
                path.projection(projection);

                svg.selectAll('path')
                    .data(states.features)
                    .enter()
                    .append('path')
                    .attr('d', path)
                    .style("stroke","black")
                    .style("fill","white")


                svg.selectAll('circle')
                          .data(cities)
                          .enter()
                          .append('circle')
                          .each(function (d) {
                              var location = projection([d.longitude, d.latitude]);
                              d3.select(this).attr({
                                  cx: location[0], cy: location[1],
                                  r: Math.sqrt(+d.population * 0.00004)
                              });
                          })
                          .style({
                              fill: 'blue',
                              opacity: 0.75
                          });
                svg.selectAll("path")
                    .style("fill",function(d) {
                        if(d.id == 2)
                          return "red"
                        else
                          return "white"

                    })
            });
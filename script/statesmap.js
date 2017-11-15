
      
      var width = 1000, height = 600;
      var scale = 8
      var w = 20
      var SCALE = 1000 //control size of map
      var svg = d3.select('div#map')
          .append('svg')
          .attr("width", width)
          .attr("height", height);
      var projection = d3.geo.albersUsa()
          .translate([width/2, height/2])
          .scale([SCALE]);
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
      diseasegroup = ['DIPHTHERIA', 'MUMPS', 'SMALLPOX', 'MEASLES', 'HEPATITIS A', 'RUBELLA', 'PERTUSSIS', 'POLIO']
      diseasegroup.forEach(function(d){
      document.getElementById('disease').options.add(new Option(d,d));
    })



      var usDataUrl = "script/map/us-states.json",
          citiesDataUrl = 'script/map/data_year_city.json';
      var code2name = d3.map()
      var rateByname = d3.map();
      var numByname = d3.map();

      disease = 'DIPHTHERIA';
      year = 1916;
      txt = "Current map shows incidence rate of ";

      d3.select("body").insert("p", ":first-child").append("input")
        .style("width","600px")
        .attr("type", "range")
        .attr("min", "1916")
        .attr("max", "2011")
        .attr("value", year)
        .attr("id", "year");

      d3.select("body").insert("h2", ":first-child").text(year)


      d3.tsv("script/map/us-state-names.tsv", function(error, name) {
        name.forEach(function(d) {
                code2name.set(d['code'], d['name']);
              });
             }); //d3.tsv

      draw()
      updatemap()
      legend(rateByname)

      function updatemap(){

      queue()
        .defer(d3.json, 'data/data_year_state.json')
        .defer(d3.json, 'data/data_city.json')
        .await(function (error, data,city) {
            if (error) throw error;
          var disease = document.getElementById("disease").value;
          if(disease!= 'DIPHTHERIA')
          {
            flag =-1;
            var checkbox = document.getElementById('city')
            checkbox.checked = false;
            $("label").hide();
          }
          else
            $("label").show();
          updatestates(year,disease,data)
          if(flag == 1)
          {          
              c = city[year]
              svg.selectAll('circle')
                  .data(c)
                  .enter()
                  .append('circle')
                  .attr('cx',function(d){ var location = projection([d.lon, d.lat])
                    return location[0];})
                  .attr('cy',function(d){ var location = projection([d.lon, d.lat]) 
                    return location[1];})
                  .attr('r',function(d){ 
                    console.log(d.cases)
                    return Math.sqrt(d.cases)/2;})
                  .style('fill','blue')
                  .style('opacity', 0.5)
            }
            else
              svg.selectAll('circle').remove()
        d3.select("#year").on("input", function() {
            year = this.value;
            d3.select("body").select("h2").text(year)
            updatestates(year,disease,data)
            if(flag == 1)
              updatecity(city[year])
          });

        }) //d3.json
      }
      function city()
      {
        flag = -flag;
        updatemap()
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
            });//await
      }//draw

      function updatestates(year,disease,data)
      {
          data[disease][year].forEach(function(d){
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
      function updatecity(data)
      {  
            svg.selectAll('circle')
                .data(data)
                .attr('r',function(d){ 
                  console.log(d.cases)
                  return Math.sqrt(d.cases)/2;})
                .style('fill','blue')
                .style('opacity', 0.5)
      }

      function legend_h(data)
      {
          for(i=0;i<scale;i++)
          {
            d3.select("body").select("svg").append('rect')
              .attr('id','legend_h')
              .attr('x',width/2+i*w)
              .attr('y',20)
              .attr('width',w)
              .attr('height',w)
              .style('fill',color_config[i])
              .on("mousemove", function(d){ console.log(d)})
              .on("mouseout", function() {
                      console.log('mouse out')
                    });

            d3.select("body").select("svg").append('text')
              .style('font-size','12px')
              .attr("x",width/2+i*w-0.5*w)
              .attr("y",function (d) {
                if(i%2 == 1)
                  return 20-0.2*w;
                else return 20 + 1.7*w})
              .text(bound[i])
          }
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
            .attr('x',function(d,i){return width/2+i*w})
            .attr('y',20)
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
            .attr("x",function(d,i) {return width/2+i*w-0.5*w})
            .attr("y",function (d,i) {
                  if(i%2 == 1)
                    return 20-0.2*w;
                  else return 20 + 1.7*w})
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

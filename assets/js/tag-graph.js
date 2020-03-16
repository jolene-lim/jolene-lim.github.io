d3.json("https://api.github.com/repos/jolene-lim/personal_projects/languages", function(data) {

    delete data['HTML'];

    var radius = $('.tag-graph').width();
    
    // Color scale
    var requests = new XMLHttpRequest();
    requests.open("GET", 'https://raw.githubusercontent.com/Diastro/github-colors/master/github-colors.json', false);
    requests.send(null);
    var githubColors = JSON.parse(requests.responseText);

    var pieColors = [];
    for (let lang of Object.keys(data)) {
        pieColors.push(githubColors[lang]);
    }

    var color = d3.scaleOrdinal()
    .domain(data)
    .range(pieColors);

    // Compute the position of each lang
    var pie = d3.pie()
        .value(function(d) {return d.value; });
    var data_ready = pie(d3.entries(data));

    // Function to generate 
    var arcGenerator = d3.arc()
        .innerRadius(0.3 * radius)
        .outerRadius(radius);

    // Pie chart
    var svg = d3.select("#tag-graph")
        .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("viewBox", -radius + ' ' + -radius + ' ' + radius * 2 + ' ' + radius * 2)
            .attr("preserveAspectRatio", "xMinYMin");

    var g = svg.selectAll(".arc")
        .data(data_ready)
        .enter()
        .append("g")
            .attr("class", "arc");

    // Arcs
    g
    .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)); })
        .attr('opacity', '0.8')
        .on('click', function(d) {
            var value = d.data.key;
            var input = $("#search-input");
            input.val(value);
            input.trigger("focus");
        });

    // Text labels        
    g
    .append('text')
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .text(function(d) { 
            return (d.data.key); 
        })
        .style("text-anchor", "middle")
        .style("font-weight", "300")
        .style("font-size", "1.8em")
        .style("fill", "white");

    g
    .on("mouseover", function() {
        d3.select(this).select("path")
            .style("opacity", "1");
        d3.select(this).select("text")
            .style("font-weight", "400")
            .style("font-size", "2em");
    })
    .on("mouseout", function() {
        d3.select(this).select("path")
            .style("opacity", "0.8");
        d3.select(this).select("text")
            .style("font-weight", "300")
            .style("font-size", "1.8em")
            .style("fill", "white");
    })
})

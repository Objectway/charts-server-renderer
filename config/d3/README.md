## How to add a new D3 chart type
- under the directory config/d3, create a copy of radial-reingold–tilford-tree.js and call it with a significant name, e.g. donut.js
- in donut.js delete all the code between ``// EDITING STARTS HERE [...] // EDITING ENDS ERE``
- follow the e.g. [http://bl.ocks.org/mbostock/3887193](http://bl.ocks.org/mbostock/3887193) 
- edit the donut.js in this way (copy it as is in your IDE):

```javascript
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });
    /*
     * Use the `wrapper` variable instead of `d3.select("body").append("svg")
     * */
    // var svg = d3.select("body").a`ppend("svg")
    var svg = wrapper
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    /*
     * Remove the csv call and invoke the `type` method on the data array `data = data.map(type)`
     * */
    // d3.csv("data.csv", type, function(error, data) {
    //     if (error) throw error;
        data = data.map(type);

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.age); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.age; });
    // });

    function type(d) {
        d.population = +d.population;
        return d;
    }

```

- now in the demo/index.html, make a request to the new chart:
    - change the ajax call to match with the new chart type 
    `url: 'http://127.0.0.1:1337/d3/donut.svg?' + (new Date()).getTime(),`
    - convert the [csv file](http://bl.ocks.org/mbostock/3887193#data.csv) to a 
    valid json using a service like [this](http://www.csvjson.com/csv2json)
    - set the value of variable chartData with the json value:
    ```json 
    [
        {
            "age": "<5",
            "population": 2704659
        },
        {
            "age": "5-13",
            "population": 4499890
        },
        {
            "age": "14-17",
            "population": 2159981
        },
        {
            "age": "18-24",
            "population": 3853788
        },
        {
            "age": "25-44",
            "population": 14106543
        },
        {
            "age": "45-64",
            "population": 8819342
        },
        {
            "age": "≥65",
            "population": 612463
        }
    ]
    ```
    - add the css style:
    ```css
        .arc text {
            font: 10px sans-serif;
            text-anchor: middle;
        }

        .arc path {
            stroke: #fff;
        }
    ```

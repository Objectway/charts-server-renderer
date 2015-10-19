# d3-server-renderer
A d3 server renderer easy to customize, it uses d3.js to render svg charts on the server-side with node.js and to serve 
it.

## Getting started
- run ``$ npm install -g d3-server-renderer`` and launch it ``$ d3-server-renderer``
- clone this project
- open in your browser the file demo/example.html to see an example

## How to add a new chart type
- inside config, create a copy of radial-reingold–tilford-tree.js and call it with a significant name, e.g. donut.js
- in donut.js delete all the code between ``// EDITING STARTS HERE [...] // EDITING ENDS ERE``
- following the e.g. [http://bl.ocks.org/mbostock/3887193](http://bl.ocks.org/mbostock/3887193) 
- edit the js in this way (copy it as is in your IDE):

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
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
*/

// Our svg variable is defined above
svg.attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

/*
d3.csv("data.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = +d.population;
  });

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
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });

});
*/

// We are moving this snippet because we receive the data object from the client
data.forEach(function(d) {
    d.population = +d.population;
  });

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
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });

```

- now in a rest client or in an html file, make a request with these parameters:
    - url: 'http://localhost:1337/'
    - type: 'json'
    - data: 
```json 
{ "type": "donut",
"data": [
    ["age","population"  ],
    ["<5","2704659"  ],
    ["5-13","4499890"  ],
    ["14-17","2159981"  ],
    ["18-24","3853788"  ],
    ["25-44","14106543"  ],
    ["45-64","8819342"  ],
    ["≥65","612463"  ]
]
}
```
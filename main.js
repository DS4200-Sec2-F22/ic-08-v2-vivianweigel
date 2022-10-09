const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 500;
const MARGINS = {left: 100, right: 100, top: 200, bottom: 200};


const FRAME = d3.select("#vis")
	.append('svg')
		.attr('height', FRAME_HEIGHT)
		.attr('width', FRAME_WIDTH)
		.attr('class', 'frame');

FRAME
	.append("text") 
	.attr("transform", "translate(100,0)") 
	.attr("x", 200) 
	.attr("y", 50) 
	.attr("font-size", "20px") 
	.text("Bar Chart"); 
 
var xScale = d3.scaleBand().range([0, FRAME_WIDTH - MARGINS.right]).padding(0.5), 
yScale = d3.scaleLinear().range([FRAME_HEIGHT - MARGINS.top, 0]); 
 
var g = FRAME.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")"); 
 
d3.csv("data/data.csv").then(function (data) { 
xScale.domain( 
data.map(function (d) { 
return d.Category; 
}) 
); 
yScale.domain([ 
0, 
d3.max(data, function (d) { 
return d.Value; 
}), 
]); 
 
g.append("g") 
.attr("transform", "translate(0," + 400 + ")") 
.call(d3.axisBottom(xScale)) 
.append("text") 
 
g.append("g") 
.call(d3.axisLeft(yScale)) 
.append("text") 
.attr("transform", "rotate(-90)")  
 
g.selectAll(".bar") 
.data(data) 
.enter() 
.append("rect") 
.attr("class", "bar") 
.attr("x", function (d) { 
return xScale(d.Category); 
}) 
.attr("y", function (d) { 
return yScale(d.Value); 
}) 
.attr("width", xScale.bandwidth()) 
.attr("height", function (d) { 
return FRAME_HEIGHT - MARGINS.top - yScale(d.Value); 
}); 
}); 
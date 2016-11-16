
$(document).ready(function () {
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        canvas = document.getElementById("sitebody"),
        width = 1000,
        height = 600,
        data = DataViz.find({}).fetch(),
        fields = ["sno", "temperature"];

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d) {
            return x(d[fields[0]]);
        })
        .y(function (d) {
            return y(parseFloat(d[fields[1]]));
        });
    var svg = d3.select("#sitebody").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g").attr("class", "y axis y-axis").call(yAxis);
    svg.append("path").datum(data)
        .attr("class", "line")
        .attr("d", line);

    DataViz.find({}).observe({
        added: function (doc) {
            var datum = {};
            datum[fields[0]] = doc[fields[0]];
            datum[fields[1]] = doc[fields[1]];
            data.push(datum);
            if (data.length > 10) {
                data.splice(0, 1);
            }
            svg.select(".line")
                .transition()
                .duration(100)
                .attr("d", line);

            x.domain(d3.extent(data, function (d) {
                return d[fields[0]];
            }));

            y.domain(d3.extent(data, function (d) {
                return parseFloat(d[fields[1]]);
            }));

            svg.select('.x-axis').call(xAxis);
            svg.select('.y-axis').call(yAxis);
        }
    });
});

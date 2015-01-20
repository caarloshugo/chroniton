var d3 = require('d3');
var chroniton = require('../');

require('./run.js');

d3.select(document.body).append('h3').text('Defaults');
d3.select(document.body)
    .append('div')
    .call(chroniton());

d3.select(document.body).append('h3').text('Custom Label Format');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .labelFormat(d3.time.format('%b %e'))
        .width(500));

d3.select(document.body).append('h3').text('Specifying the date Domain');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .width(500));

(function() {
d3.select(document.body).append('h3').text('Play button');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .playButton(true)
        .width(400));
})();

(function() {
d3.select(document.body).append('h3').text('Using axis.ticks');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .tapAxis(function(axis) { axis.ticks(5); })
        .width(200));
})();

d3.select(document.body).append('h3').text('Short timespan');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .tapAxis(function(axis) { axis.ticks(5); })
        .width(200));

d3.select(document.body).append('h3').text('No label');
var eventExample = chroniton()
  .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
  .hideLabel()
  .tapAxis(function(axis) { axis.ticks(5); })
  .width(600);

d3.select(document.body)
    .append('div')
    .call(eventExample);

var output = d3.select(document.body)
    .append('pre');

eventExample.on('change', function(v) {
  output.text(v);
});

d3.select(document.body).append('h3').text('Setting the value programmatically');
var setValueExample = chroniton()
  .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
  .width(700);
d3.select(document.body)
    .append('div')
    .call(setValueExample);
d3.select(document.body)
  .append('button')
  .text('set value')
  .on('click', function() {
    setValueExample.setValue(new Date(+new Date() - 60 * 1000 * 500));
  });

(function() {
d3.select(document.body).append('h3').text('Setting the value programmatically with a transition');
var setValueExample2 = chroniton()
  .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
  .width(700);
d3.select(document.body)
    .append('div')
    .call(setValueExample2);
d3.select(document.body)
  .append('button')
  .text('set value')
  .on('click', function() {
    setValueExample2.setValue(new Date(+new Date() - 60 * 1000 * 500), true);
  });
})();

(function() {
d3.select(document.body).append('h3').text('Setting the value programmatically with transition options');
var setValueExample2 = chroniton()
  .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
  .width(700);
d3.select(document.body)
    .append('div')
    .call(setValueExample2);
d3.select(document.body)
  .append('button')
  .text('set value')
  .on('click', function() {
    setValueExample2.setValue(new Date(+new Date() - 60 * 1000 * 500), {
      duration: 5000,
      ease: 'linear'
    });
  });
})();

(function() {
d3.select(document.body).append('h3').text('Aligned Chart');

var scaleExample = chroniton()
  .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
  .hideLabel()
  .width(700);

var margin = scaleExample.getMargin();
margin.bottom = 0;
margin.top = 50;
var height = 30;
var width = scaleExample.width();
var x = scaleExample.getScale();
var y = d3.scale.linear()
    .range([height, 0]);

var data = [];


for (var t = +scaleExample.domain()[0]; t <= scaleExample.domain()[1]; t += 1000 * 1000) {
  data.push({ n: Math.random(), date: new Date(t) });
}

y.domain([0, d3.max(data, function(d) { return d.n; })]);

var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.n); })
    .interpolate('step-before');

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

var label = svg.append("text").attr('text-anchor', 'middle');
var connector = svg.append("rect").attr('width', 2);

var bisect = d3.bisector(function(d) { return d.date; }).left;
scaleExample.on('change', function(d) {
  var datum = data[bisect(data, d)];
  label
    .attr('transform', 'translate(' + [x(d), -10] + ')')
    .text(datum.n.toFixed(3));
  connector
    .attr('transform', 'translate(' + [x(d) - 1, -5] + ')')
    .attr('height', y(datum.n) + 3);
});

d3.select(document.body)
    .append('div')
    .call(scaleExample);
})();

(function() {
d3.select(document.body).append('h3').text('Styling with CSS');
var setValueExample2 = chroniton()
  .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
  .width(700);
d3.select(document.body)
    .append('div')
    .attr('class', 'theme-example')
    .call(setValueExample2);
})();

(function() {
d3.select(document.body).append('h3').text('calling .play()');
d3.select(document.body)
    .append('div')
    .attr('class', 'theme-example')
    .call(chroniton()
      .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
      .width(700).play());
})();

(function() {
d3.select(document.body).append('h3').text('calling .play() with .loop(true)');
d3.select(document.body)
    .append('div')
    .attr('class', 'theme-example')
    .call(chroniton()
      .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
      .width(700).loop(true).play());
})();


(function() {
d3.select(document.body).append('h3').text('calling .play(), .pause(), and .stop() with buttons');
var c = chroniton()
   .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
   .width(700).loop(true);
d3.select(document.body)
    .append('div')
    .attr('class', 'theme-example')
    .call(c);

d3.select(document.body)
    .append('button').text('play').on('click', function() { c.play(); });

d3.select(document.body)
    .append('button').text('pause').on('click', function() { c.pause(); });

d3.select(document.body)
    .append('button').text('stop').on('click', function() { c.stop(); });

})();

d3.select(document.body).append('h3').text('Created without using a d3 selection');
var div = document.body.appendChild(document.createElement('div'));
chroniton()(div);

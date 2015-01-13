var d3 = require('d3');
var chroniton = require('../');


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

d3.select(document.body).append('h3').text('Using axis.ticks');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .tapAxis(function(axis) { axis.ticks(5); })
        .width(200));

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

d3.select(document.body).append('h3').text('Created without using a d3 selection');

var div = document.body.appendChild(document.createElement('div'));
chroniton()(div);

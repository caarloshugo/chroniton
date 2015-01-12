var d3 = require('d3');
var chroniton = require('../');

d3.select(document.body)
    .append('div')
    .call(chroniton());

d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .width(500));

d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .width(500));

d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .tapAxis(function(axis) { axis.ticks(5); })
        .width(200));

d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .tapAxis(function(axis) { axis.ticks(5); })
        .width(200));

d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000 * 1000), new Date()])
        .hideLabel()
        .tapAxis(function(axis) { axis.ticks(5); })
        .width(700));

var d3 = require('d3');
var chroniton = require('../');
var togeojson = require('togeojson');
var fs = require('fs');
L.mapbox.accessToken = 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ';

var runXML = fs.readFileSync(__dirname + '/run.gpx');

var dom = (new DOMParser()).parseFromString(runXML, 'text/xml');
var geojson = togeojson.gpx(dom);
geojson.features[0].properties.stroke = '#fa0';
geojson.features[0].properties['stroke-width'] = 3;

var mapDiv = d3.select(document.body).append('div').attr('id', 'map');
var map = L.mapbox.map(mapDiv.node(), 'tmcw.gp8115m8');
var runLayer = L.mapbox.featureLayer(geojson).addTo(map);
map.fitBounds(runLayer.getBounds());

var hereMarker = L.marker(L.latLng(
  geojson.features[0].geometry.coordinates[0][1],
  geojson.features[0].geometry.coordinates[0][0]
)).addTo(map);

var moments = geojson.features[0].properties.coordTimes.map(function(d) {
  return new Date(d);
});

var momentPlaces = geojson.features[0].properties.coordTimes.map(function(d, i) {
  return [new Date(d), geojson.features[0].geometry.coordinates[i]];
});

var heartRates = geojson.features[0].geometry.coordinates.map(function(d, i) {
  return [moments[i], d[2]];
});

var domain = d3.extent(moments);

var slider = chroniton()
  .domain(domain)
  .labelFormat(d3.time.format('%b %e'))
  .width(700);

var bisectPlace = d3.bisector(function(d) { return d[0]; }).left;
slider.on('change.place', function(d) {
  var datum = momentPlaces[bisectPlace(momentPlaces, d)];
  hereMarker.setLatLng(L.latLng(datum[1][1], datum[1][0]));
});

// Elevation scale
var margin = slider.getMargin();
margin.bottom = 0;
margin.top = 50;
var height = 30;
var width = slider.width();
var x = slider.getScale();
var y = d3.scale.linear().range([height, 0]);

y.domain([0, d3.max(heartRates, function(d) { return d[1]; })]);

var area = d3.svg.area()
    .x(function(d) { return x(d[0]); })
    .y0(height)
    .y1(function(d) { return y(d[1]); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("path")
    .datum(heartRates)
    .attr("class", "area")
    .attr("d", area);

var label = svg.append("text").attr('text-anchor', 'middle');
var connector = svg.append("rect").attr('width', 2);

var bisect = d3.bisector(function(d) { return d[0]; }).left;
slider.on('change.heart', function(d) {
  var datum = heartRates[bisect(heartRates, d)];
  label
    .attr('transform', 'translate(' + [x(d), -10] + ')')
    .text(datum[1].toFixed(3));
  connector
    .attr('transform', 'translate(' + [x(d) - 1, -5] + ')')
    .attr('height', y(datum[1]) + 3);
});

d3.select(document.body)
  .append('div')
  .call(slider);



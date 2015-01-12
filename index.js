var d3 = require('d3');

function chroniton() {
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
  domain = [new Date('1/1/2000'), new Date()],
  width = 760,
  height = 60,
  labelFormat = d3.time.format("%Y-%m-%d"),
  xScale = d3.time.scale().clamp(true),
  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickSize(10, 0);

  var events = d3.dispatch('change');

  function chart(selection) {
    selection.each(function() {

      xScale
        .domain(domain)
        .range([0, width - margin.left - margin.right]);

      var brush = d3.svg.brush()
        .x(xScale)
        .extent(domain)
        .on('brush', brushed);

      var svg = d3.select(this).selectAll('svg').data([0]);

      var gEnter = svg.enter().append('svg').append('g');
      gEnter.append('g').attr('class', 'x axis');

      svg .attr('width', width)
      .attr('height', height);

      var g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      g.select('.x.axis')
        .attr('transform', 'translate(0,' + (height - margin.bottom - margin.top) + ')')
        .call(xAxis);

      var slider = g.append('g')
        .attr('class', 'slider')
        .attr('transform', 'translate(' + [0, height - margin.bottom - margin.top] + ')')
        .call(brush);

      var handleRadius = 6,
        handleHeight = 8,
        caretHeight = 6;

      var d = [
        // top
        -handleRadius, -handleHeight,
        handleRadius, -handleHeight,

        handleRadius, handleHeight - caretHeight,
        0, handleHeight,
        -handleRadius, handleHeight - caretHeight,

        -handleRadius, -handleHeight];

      var handle = slider.append('path')
        .attr('d', 'M' + d.join(','))
        .attr('class', 'handle');

      var textG = slider.append('g')
        .attr('transform', 'translate(0, -35)');

      var labelText = textG
        .append('text')
        .attr('class', 'label');

      slider.call(brush.event);

      brush.on('brushstart', function() {
        slider.classed('brushing', true);
      });

      brush.on('brushend', function() {
        slider.classed('brushing', false);
      });

      function brushed() {
        var value = brush.extent()[0];

        if (d3.event.sourceEvent) { // not a programmatic event
          value = xScale.invert(d3.mouse(this)[0]);
          brush.extent([value, value]);
        }

        handle.attr('transform', function(d) { return 'translate(' + [xScale(value), 0] + ')'; });

        labelText.text(labelFormat(value)).attr('text-anchor', 'middle');
        var textRadius = labelText.node().getComputedTextLength() / 2;
        labelText.attr('transform', function(d) {
          return 'translate(' + [xScale(value), 20] + ')';
        });
        var leftEdge = xScale(value) - textRadius;
        var rightEdge = xScale(value) + textRadius;

        if (leftEdge < 0) {
          labelText.attr('text-anchor', 'start');
        } else if (rightEdge > width - margin.left) {
          // to the right
          labelText.attr('text-anchor', 'end');
        }

        events.change(value);
      }
    });
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.tapAxis = function(_) {
    _(xAxis);
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return chart;
  };

  chart.labelFormat = function(_) {
    if (!arguments.length) return labelFormat;
    labelFormat = _;
    return chart;
  };

  chart.hideLabel = function() {
    labelFormat = d3.functor('');
    return chart;
  };

  return d3.rebind(chart, events, 'on');
}

module.exports = chroniton;

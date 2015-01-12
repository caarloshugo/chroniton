# chroniton

A time slider input for time-based visualizations and data.

## Features

* Customizable label formatting
* Smart label position for current time
* APIs for setting and retrieving time data
* Keybindings for navigating with ← and →

## API

This follows the [d3 reusable charts](http://bost.ocks.org/mike/chart/) pattern
and uses [d3](http://d3js.org/) internally, so documentation from that library
is useful to complement this documentation.

### `chroniton()`

Constructs a new timeline instance with default values.

All of the following API methods beginning with `.` are called on an instance
created with `chroniton()`.

This exposes a function that can either be called in a chain with [d3's selection.call](https://github.com/mbostock/d3/wiki/Selections)
method or called directly as `chroniton()(selection)`.

**Example**

```js
d3.select(document.body)
    .append('div')
    .call(chroniton());
```

### `.domain([start, end])`

Given an array of two `Date` objects, set these as the earliest and latest
date selectable through the input.

**Example**

```js
d3.select(document.body)
  .append('div')
  .call(
    chroniton()
      .domain([new Date(+new Date() - 60 * 1000), new Date()])
```

### `.keybinding(true or false)`

Turn on and off the default keybindings that link arrow left & right keys
to moving the value forward and backward.

### `.labelFormat(function)`

Use a different format to show the 'now' label in the input. The default
value is `d3.time.format("%Y-%m-%d")`. The function should take a `Date`
object as an argument and return a string. See [d3.time.format](https://github.com/mbostock/d3/wiki/Time-Formatting)
documentation for hints.

**Example**

```js
d3.select(document.body)
  .append('div')
  .call(
    chroniton()
      // hours and minutes - time format
      .labelFormat(d3.time.format('%X')));
```

### `.hideLabel()`

The equvalent of calling `.labelFormat(function() { return ''; })`: this
hides the label that shows what the current value is.

### `.width(number)`, `.height(number)`

Change these dimensions of the graph.

### `.tapAxis(function)`

Call an arbitrary function on the input's axis object. Useful for calling
any of the [d3.svg.axis](https://github.com/mbostock/d3/wiki/SVG-Axes) methods
before the thing is constructed.


**Example**

```js
d3.select(document.body)
  .append('div')
  .call(
    chroniton()
      .tapAxis(function(axis) { axis.ticks(5); }));
```

### `.on('change', function)`

Listen for changes in the input. Programmatic changes also fire this event.
Calls the given callback function with a current value as a `Date` object.

**Example**

```js
d3.select(document.body)
  .append('div')
  .call(
    chroniton()
    .on('change', function(d) { alert(d); }));
```

### `.setValue(Date object)`

Set the value of the input to a given `Date` object, redraw it, and fire
a `change` event.

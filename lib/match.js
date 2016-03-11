'use strict';

const minimatch = require('minimatch');

function match(filename, patterns) {
  return patterns.some((pattern) => minimatch(filename, pattern));
}

module.exports = match;

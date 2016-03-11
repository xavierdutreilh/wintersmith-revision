'use strict';

const minimatch = require('minimatch');

function should(filename, patterns) {
  return patterns.some((pattern) => minimatch(filename, pattern));
}

module.exports = should;

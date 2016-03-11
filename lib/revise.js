'use strict';

const path = require('path');

const hash = require(path.join(__dirname, 'hash'));

function revise(filepath) {
  const file = path.parse(filepath.relative);
  const revision = hash(filepath.full).substring(0, 12);

  return path.join(file.dir, file.name + '.' + revision + file.ext);
}

module.exports = revise;

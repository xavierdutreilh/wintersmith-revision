'use strict';

const path = require('path');

const revise = require(path.join(__dirname, 'revise'));
const should = require(path.join(__dirname, 'should'));

function index(env, callback) {
  const patterns = env.config.revision || ['**/*'];

  env.plugins.StaticFile.prototype.getFilename = function getFilename() {
    if (should(this.filepath.relative, patterns)) {
      return revise(this.filepath);
    } else {
      return this.filepath.relative;
    }
  };

  callback();
}

module.exports = index;

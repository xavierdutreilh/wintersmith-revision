'use strict';

const path = require('path');

const match = require(path.join(__dirname, 'match'));
const revise = require(path.join(__dirname, 'revise'));

function index(env, callback) {
  const patterns = env.config.revision || ['**/*'];

  env.plugins.StaticFile.prototype.getFilename = function getFilename() {
    if (match(this.filepath.relative, patterns)) {
      return revise(this.filepath);
    }

    return this.filepath.relative;
  };

  callback();
}

module.exports = index;

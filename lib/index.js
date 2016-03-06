'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const minimatch = require('minimatch');

module.exports = function(env, callback) {
  const revision = env.config.revision || ['**/*'];

  function should(filename) {
    return revision.some((pattern) => minimatch(filename, pattern));
  }

  function hash(filename) {
    const hash = crypto.createHash('sha1');

    hash.setEncoding('hex');
    hash.write(fs.readFileSync(filename));
    hash.end();

    return hash.read();
  }

  env.plugins.StaticFile.prototype.getFilename = function() {
    if (should(this.filepath.relative)) {
      const file = path.parse(this.filepath.relative);
      const revision = hash(this.filepath.full).substring(0, 12);

      return path.join(file.dir, file.name + '.' + revision + file.ext);
    } else {
      return this.filepath.relative;
    }
  };

  callback();
};

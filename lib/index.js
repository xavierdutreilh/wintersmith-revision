'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var minimatch = require('minimatch');

module.exports = function(env, callback) {
  var revision = env.config.revision || ['**/*'];

  function should(filename) {
    return revision.some((pattern) => minimatch(filename, pattern));
  }

  function hash(filename) {
    var hash = crypto.createHash('sha1');

    hash.setEncoding('hex');
    hash.write(fs.readFileSync(filename));
    hash.end();

    return hash.read();
  }

  env.plugins.StaticFile.prototype.getFilename = function() {
    if (should(this.filepath.relative)) {
      var file = path.parse(this.filepath.relative);
      var revision = hash(this.filepath.full).substring(0, 12);

      return path.join(file.dir, file.name + '.' + revision + file.ext);
    } else {
      return this.filepath.relative;
    }
  };

  callback();
};

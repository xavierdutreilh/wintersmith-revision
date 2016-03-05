'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var minimatch = require('minimatch');

module.exports = function(env, callback) {
  var revision = env.config.revision || ['**/*'];

  env.plugins.StaticFile.property('shouldRevision', 'getShouldRevision');

  env.plugins.StaticFile.prototype.getShouldRevision = function() {
    var pattern = revision.find(function(pattern) {
      return minimatch(this.filepath.relative, pattern);
    }.bind(this));

    return pattern !== undefined;
  };

  env.plugins.StaticFile.property('hash', 'getHash');

  env.plugins.StaticFile.prototype.getHash = function() {
    var hash = crypto.createHash('sha1');

    hash.setEncoding('hex');
    hash.write(fs.readFileSync(this.filepath.full));
    hash.end();

    return hash.read();
  };

  env.plugins.StaticFile.prototype.getFilename = function() {
    if (this.shouldRevision) {
      var file = path.parse(this.filepath.relative);
      var revision = this.hash.substring(0, 12);

      return path.join(file.dir, file.name + '.' + revision + file.ext);
    } else {
      return this.filepath.relative;
    }
  };

  callback();
};

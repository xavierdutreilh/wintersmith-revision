'use strict';

const crypto = require('crypto');
const fs = require('fs');

function hash(filename) {
  const hash = crypto.createHash('sha1');

  hash.setEncoding('hex');
  hash.write(fs.readFileSync(filename));
  hash.end();

  return hash.read();
}

module.exports = hash;

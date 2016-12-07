'use strict';

const fs = require('fs');

function read(filename) {
  return fs.readFileSync(filename, 'utf8');
}

exports.revision = {
  'build': (test) => {
    const actual = read(`${__dirname}/../tmp/index.html`);
    const expected = read(`${__dirname}/expected/index.html`);

    test.equal(actual, expected, 'should revision static files');

    test.done();
  },
};

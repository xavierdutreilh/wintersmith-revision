'use strict';

const fs = require('fs');

function read(filename) {
  return fs.readFileSync(filename, {'encoding': 'utf8'});
}

exports.revision = {
  'build': (test) => {
    const actual = read('tmp/index.html');
    const expected = read('test/expected/index.html');

    test.equal(actual, expected, 'should revision static files');

    test.done();
  },
};

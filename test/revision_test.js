'use strict';

var fs = require('fs');

function read(filename) {
  return fs.readFileSync(filename, {'encoding': 'utf8'});
}

exports.revision = {
  'build': function(test) {
    var actual = read('tmp/index.html');
    var expected = read('test/expected/index.html');

    test.equal(actual, expected, 'should revision static files');

    test.done();
  },
};

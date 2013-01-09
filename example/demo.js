var failing = require('../').failing;

// example
var fs = require('fs');
var api = function (file, callback) {
  fs.readFile(file, 'utf-8', failing(callback).passing(function (text) {
    // do something
    callback(null, text.substring(10, 20));
  }));
};

api(__filename, function () {
  console.log(arguments);
});

api('hehe', function () {
  console.log(arguments);
});

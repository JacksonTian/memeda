var Callback = function (callback) {
  this.callback = callback || function (err) {
    throw err;
  };
};

Callback.prototype.passing = function (handle) {
  var callback = this.callback;
  handle = handle || function () {};
  return function (err, other) {
    if (err) {
      return callback(err);
    }
    // handle other data
    handle.apply(null, [].slice.call(arguments, 1));
  };
};

exports.failing = function (callback) {
  return new Callback(callback);
};

exports.passing = function (callback) {
  return new Callback().passing(callback);
};

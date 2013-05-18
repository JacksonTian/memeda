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
    if (arguments.length === 2) {
      return handle(other);
    }
    var args = [].slice.call(arguments, 1);
    handle.apply(null, args);
  };
};

var memeda = function (callback, handle) {
  return (new Callback(callback)).passing(handle);
};

memeda.failing = function (callback) {
  return new Callback(callback);
};

memeda.passing = function (handle) {
  return (new Callback()).passing(handle);
};

module.exports = memeda;

var memeda  = require('../');
var should = require('should');

describe('memeda', function () {
  it('failing', function (done) {
    var errorHandler = function (err) {
      should.exist(err);
      err.message.should.equal('mock Error');
      done();
    };
    var callback = memeda.failing(errorHandler).passing();
    callback(new Error('mock Error'));
  });

  it('passing', function (done) {
    var handler = function (data) {
      data.should.have.property('module', 'memeda');
      done();
    };
    var callback = memeda.failing().passing(handler);
    callback(null, {'module': 'memeda'});
  });

  it('passing multi value', function (done) {
    var handler = function (data, data2) {
      data.should.have.property('module', 'memeda');
      data2.should.have.property('foo', 'bar');
      done();
    };
    var callback = memeda.failing().passing(handler);
    callback(null, {'module': 'memeda'}, {'foo': 'bar'});
  });

  it('together', function (done) {
    var handler = function (data) {
      data.should.have.property('module', 'memeda');
      done();
    };
    var callback = memeda.failing(done).passing(handler);
    callback(null, {'module': 'memeda'});
  });
});

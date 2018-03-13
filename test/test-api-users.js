var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
  it('should list ALL users on /users GET', function(done) {
  	chai.request(server)
  		.get('/api/users')
  		.end(function(err, res) {
  			res.should.have.status(200);
  			done();
  		});
  });
  it('should list a SINGLE user on /users/<id> GET');
  it('should add a SINGLE user on /users POST');
  it('should update a SINGLE user on /users/<id> PUT');
  it('should delete a SINGLE user on /users/<id> DELETE');
});

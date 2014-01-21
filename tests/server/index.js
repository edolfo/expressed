var should = require('should'),
    supertest = require('supertest'),
    baseURL = 'http://localhost:3001',
    request = supertest(baseURL),
    user = supertest.agent(baseURL);

describe('GET /', function(){
    it('should get the home page', function(done){
        request.get('/').expect(200, done);
    });

    it('should get the homepage with an agent', function(done){
        user.get('/').expect(200, done);
    });
});

describe('Authorization', function(){
    it('should not be logged in', function(done){
        user.get('/')
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(200);
            should.not.exist(res.headers['set-cookie']);
            res.text.should.include('login');
            done();
        });
    });

    it('should get the login page', function(done){
        user.get('/login')
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(200);
            res.text.should.include('email');
            res.text.should.include('password');
            res.text.should.include('submit');
            done();
        });
    });

    it('should successfully login and redirect', function(done){
        user.post('/login?username=elicudine@svbio.com&password=edolfo')
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(302);
            res.header.location.should.include('/account');
            res.text.should.include('Redirecting to /account');
            done();
        });
    });

    it('should have access to /account', function(done){
        user.get('/account')
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(200);
            res.text.should.include('Authenticated!');
            done();
        });
    });

    it('should successfully log out', function(done){
        user.get('/logout')
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(302);
            res.text.should.include('Redirecting to /');
            res.header.location.should.be.exactly('/');
            done();
        });
    });

    it('should no longer have access to /account', function(done){
        user.get('/account')
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(404);
            done();
        });
    });

    it('should not error when accessing /logout', function(done){
        user.get('/logout')
        .end(function(err, res){
            should.not.exist(err);
            res.should.have.status(302);
            res.header.location.should.be.exactly('/');
            res.text.should.include('Redirecting to /');
            done();
        });
    });
});

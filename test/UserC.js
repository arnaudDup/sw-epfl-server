//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var utils = require('../apiControler/utils/Utils.js');
var should = chai.should();

// import model form the ORM
var User = require('../apiControler/database/SequelizeORM.js').User;

chai.use(chaiHttp);

//Our parent block
describe('Test User API', () => {

    // Before each test we insert a user. 
    beforeEach((done) => { 
       utils.logInfo("Before testing(), insertion of an user");
       done();
    });

 describe('create user', () => {
        it('should create a user', (done) => {
          chai.request(server)
            .post('/api/Users')
            .field("id",10211410486004808)
            .field("accesToken","EAAOZCzloFDqEBALJ3TCa6x0vPb0pCXDXiA5RpBK4yaMTcX9qpZB9ffvW9nJ6hyUMCorMbVs0MLyMbrtf2iAOYmUP36RcdlcvXGs7KZBAexmtAUAjZApNX0FmYQS1rIRRlZBoLaiJujNtUJu5mZCk6PaPPWw5DnJtjTSiU3ZBlxxDv5WDFmwyS1IIf7Xu9MgCNijsO0V4htawAZDZD")
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('idApiconnexion').eql('10211410486004808');
                    res.body.should.have.property('firstname').eql('arnaud');
                    res.body.should.have.property('lastname').eql('dupeyrat');
                    done();
              });
        });
    });
  


    // After each test we remove each test we insert a user. 
    afterEach((done) => { 
       User.dropAllSchemas().then(function () {
            log.info("remove all schema")
        });
    });


});
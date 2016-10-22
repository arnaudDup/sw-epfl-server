//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var utils = require('../apiControler/utils/Utils.js');
var should = chai.should();
var setting = require('../setting/error.js');

// import model form the ORM
var User = require('../apiControler/database/SequelizeORM.js').User;

chai.use(chaiHttp);

 // ----------------------------------------------   DEFINE USEFUL CONSTANT  -----------------------------------------
var userTest = {

          "email": "etienne.husler@epfl.ch",
          "id" : "121620614972695",
          "firstname": "Sweng",
          "lastname": "Tests",
          "profilePicture": "https://graph.facebook.com/121620614972695/picture?height=500&width=500",
          "backgroundPicture": "https://graph.facebook.com/121620614972695/picture?height=500&width=500"
  }

var FAKE_ID = 1; 
 // ----------------------------------------------   TEST  -----------------------------------------

//Our parent block
describe('Test User API', () => {

    // Before each test we insert a user. 
    before((done) => { 
          // We rfroce to recreate the table User.
          User.sync({force: true}).then(function () {done();});
    });


 // ----------------------------------------------   Create User -----------------------------------------
 describe('create user', () => {
        it('should create a user', (done) => {
          chai.request(server)
            .post('/api/Users')
            .send({"id":userTest.id,
                    "accesToken":"EAAOZCzloFDqEBAHGnY8Q6I4d6fJRy9c6FWYZAqNxp2ChFBvpv8ZAycQC7a0oT21ZBp0KuIbZCIUkLWSH4Ev7pI"+
                    "QrjlzAxvrfznhXZAeb8A3ZCZBDks8WekNs4WgtfteZCMhUPQx5ZBPmbBMfwBgjqqAeaHOjtYFe38VYfXV35ZCnQ0yZBzPSDzCKDBBMkGhWA8ZAyrJAcBZA6LCi5XtgZDZD"
              })
              .end((err, res) => {
                    res.should.have.status(setting.htmlCode.succes_request);

                       // select query.
                       var getUser =  User.findOne({
                            where: {
                              idApiConnection: userTest.id
                            }
                          }).then(function(getUser) {
                            
                              // test the new value of the User.
                              chai.assert.equal(getUser.idApiConnection, userTest.id, 'id should be equals');
                              chai.assert.equal(getUser.firstname, userTest.firstname, 'firstName should be equals');
                              chai.assert.equal(getUser.lastname, userTest.lastname, 'lastname should be equals');
                              chai.assert.equal(res.text.backgroundPicture, userTest.backgroundPicture, 'backkground picture should be equals');
                              chai.assert.equal(res.text.profilePicture, userTest.profilePicture, 'profile picture should be equals');
                              done();

                          }).catch(function(error) {
                             utils.logInfo("Updateuser(), the request fail" +error);
                             chai.assert.isOk(false, 'impossible to add user');
                             done();
                          });
                    done();
              });
        });
    });


 describe('create user', () => {
        it('should create a user', (done) => {
          chai.request(server)
            .post('/api/Users')
            .send({"id":FAKE_ID,
                    "accesToken":"EAAOZCzloFDqEBAHGnY8Q6I4d6fJRy9c6FWYZAqNxp2ChFBvpv8ZAycQC7a0oT21ZBp0KuIbZCIUkLWSH4Ev7pI"+
                    "QrjlzAxvrfznhXZAeb8A3ZCZBDks8WekNs4WgtfteZCMhUPQx5ZBPmbBMfwBgjqqAeaHOjtYFe38VYfXV35ZCnQ0yZBzPSDzCKDBBMkGhWA8ZAyrJAcBZA6LCi5XtgZDZD"
              })
              .end((err, res) => {
                    res.should.have.status(setting.htmlCode.unavailable_ressources);
                    done();
              });
        });
    });
  
});
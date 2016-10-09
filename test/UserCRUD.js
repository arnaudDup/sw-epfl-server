//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
var utils = require('../apiControler/utils/Utils.js');
let should = chai.should();

chai.use(chaiHttp);

// define constante 
var userTest = {

          "email": "test@test.test",
          
          "cover": {
              "id": "10201080259875610",
              "offset_y": 118,
              "source": "https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/733993_10201080259875611_448223958_n.jpg?oh=96d0c1c39fb236ccecf40eaadaea75ed&oe=58719500"
          },

          "birthday": "02/17/1994",
          "first_name": "Antoine",
          "last_name": "Dupond",
          "name": "Antoine Dupond",

          "picture": {
            "data": {
              "is_silhouette": false,
              "url": "https://graph.facebook.com/10211410486004800/picture?height=500&width=500"
            }
          },
          "id": "10211410486004800"
  }

var inserQuery = "insert into usertable (idapiconnection,lastname,firstname,email,birthdate,profilepicture,"+
                  "coverpicture) values("+userTest.id+",'"+userTest.last_name+"',"+
                  "'"+userTest.first_name+"','"+userTest.email+"','"+userTest.birthday+"','"+
                  userTest.picture.url+"','"+userTest.cover.source+"');";

//Our parent block
describe('Test User API', () => {

    // Before each test we insert a user. 
    beforeEach((done) => { 
       utils.logInfo("Before testing(), insertion of an user");
       done();
    });
  
    /*
    * Should test if we can get the user
    */
    describe('get user', () => {
        it('should get a user', (done) => {
          chai.request(server)
              .get('/api/User/'+userTest.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    /*
    * Should test if we can create the user.
    */
    describe('create user', () => {
        it('should create a user', (done) => {
          chai.request(server)
              .post('/api/User/')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    /*
    * Should test if we delete the user.
    */
    describe('delete user', () => {
        it('should delete a user', (done) => {
          chai.request(server)
              .delete('/api/User/'+userTest.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    /*
    * Should test if we update the user.
    */
    describe('update user', () => {
        it('should update a user', (done) => {
          chai.request(server)
              .post('/api/User/'+userTest.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });




    // After each test we remove each test we insert a user. 
    afterEach((done) => { 
        utils.logInfo("After testing(), removal of a user of an user");
        done();
    });


});
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var utils = require('../apiControler/utils/Utils.js');
var should = chai.should();
var setting = require('../setting/error.js');
var musicManipulation = require ('../apiControler/object/music.js')

chai.use(chaiHttp);
var User = require('../apiControler/database/SequelizeORM.js').User;


// ----------------------------------------------   DEFINE USEFUL CONSTANT  -----------------------------------------

var  MusicTest ={
    "id": 11,
    "artist": "chere",
    "name": "Beliver",
    "url": "",
    "tag": "pop",
    "updatedAt": "2016-10-27T09:16:35.972Z",
    "createdAt": "2016-10-27T09:16:35.972Z",
    "UserId": null
  }

  var  MusicTestUpdate = {
    "id": 11,
    "artist": "chere",
    "name": "Beliver",
    "url": "",
    "tag": "pop",
  }

// ----------------------------------------------   TEST  -----------------------------------------

//Our parent block
describe('Test Music API', () => {


  // ----------------------------------------------   COMPUTE Object  -----------------------------------------
    describe('Compute new Music object', () => {
        it('should compute the client response', (done) => {
                    var result = musicManipulation.transformResponseClient(MusicTest)
                    chai.assert.equal(result,MusicTestUpdate,'objects are not be equals');
                    done();

              });
        });

});
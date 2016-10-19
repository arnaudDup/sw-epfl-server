// Récupération du Modèle
var modele  = require('./response.js');
var unirest = require('unirest');
var util = require('util');
var setting = require('../../setting/error.js');
var databaseConfig = require('../../setting/database.js');
var userDto = require ('../object/user.js')
var utils = require('../utils/Utils.js');

// database
var databasePostgres = require('../database/postgres.js');
var User = require('../database/SequelizeORM.js').User;

// Définition de l'objet controllerUtilisateur
function controllerUtilisateur(){

  // private method, allow to create a specific user by the object given by facebook.
  var createUser = function(res,callback){

          // build the url to get the picture
          var urlPictureFacebook = "https://graph.facebook.com/"+res.body.id+"/picture?height=500&width=500"; 
          utils.logInfo("createUser(), insertion or geetin a user");

          // Insert the new user in the database .
          User.sync({force: false}).then(function () {

                var createUser =  User.create({
                        idApiConnection : res.body.id, 
                        lastname : res.body.last_name,
                        firstname: res.body.first_name,
                        email : res.body.email,
                        //birthdate : res.body.birthday,
                        profilePicture : urlPictureFacebook,
                        backgroundPicture : res.body.cover.source

                // callback if the user srequest succeed.
                }).then(function(createUser) {
                        utils.logInfo("createUser(), the request succeed");
                        // remove the id in oder to keep only adiApi facebook
                        delete createUser.dataValues['id']
                        callback(createUser,setting.htmlCode.succes_request);

                // return a 500 code if the request is null.
                }).catch(function(error) {
                     utils.logInfo("createUser(), the request fail");
                    callback(null,setting.htmlCode.unavailable_ressources);
                })

           });
    }


  // private method, allow to get a specific user designed by api connection.
  var getUserByIdConnection = function(idApi,callback){

      var urlPictureFacebook = "https://graph.facebook.com/"+idApi+"/picture?height=500&width=500"; 
      utils.logInfo("controllerUtilisateur(), insertion or geetin a user, adduser()");

      User.sync().then(function () {

         var getUser =  User.findOne({
              where: {
                idApiConnection: idApi
              }

            }).then(function(getUser) {

                utils.logError("request succeed"+idApi)
                delete getUser.dataValues['id']
                callback(getUser.dataValues,setting.htmlCode.succes_request);

            }).catch(function(error) {

                utils.logError("error getting user : "+idApi)
                callback(null,setting.htmlCode.unavailable_ressources);
            });
        });
    }


    this.updateGetInformationUser = function (body,callback)
    {     
        utils.logDebug("adduser()"+JSON.stringify(buildRequestFacebook(body.id,body.accesToken)));

        // GET the user description by doing a post on facebook API.
        unirest.get(buildRequestFacebook(body.id,body.accesToken)).end(function(res){

          // We can't reach the facebook graph.
          if (res.error) {
           callback(null,setting.htmlCode.unavailable_ressources);
          }
          else {
                // make an JsonObject.
                res.body  = JSON.parse(res.body); 
                // build the url to get the picture
                var urlPictureFacebook = "https://graph.facebook.com/"+res.body.id+"/picture?height=500&width=500"; 

                utils.logInfo("updateGetInformationUser(), insertion or geetin a user, adduser()");


               // We synchronize with the databse in order to change the name and the 
               User.sync({}).then(function () {

                     var CreateUser =  User.update({
                          email : res.body.email,
                          profilePicture : urlPictureFacebook,
                          backgroundPicture : res.body.cover.source
                      }, 
                      {
                      where: {
                                idApiConnection: res.body.id
                             }
                  // callback if the user srequest succeed.
                  }).then(function(CreateUser) {
                      utils.logInfo("updateGetInformationUser(), the request succeed");

                      // We don't find any users with the id, we need to add the new user
                      // to the database.
                      if(CreateUser[0] == 0){
                        utils.logInfo("creation d'un nouveau utilisateur");
                        createUser(res,callback);
                      }
                      // We get the user in the database and send to the client. 
                      else{
                          utils.logInfo("get the user freshly updated");
                          getUserByIdConnection(res.body.id,callback);
                      }

                  // if there is any error in computing value for user.
                  }).catch(function(error) {
                       utils.logInfo("updateGetInformationUser(), the request fail"+error);
                       callback(null,setting.htmlCode.unavailable_ressources);
                  })

              });
            }

        })
    };

    this.getUser = function(idApi,callback){
      utils.logInfo("controllerUtilisateur(), get user "+idApi+", getUser()");
      getUserByIdConnection(idApi,callback)
    }  

    this.removeUser = function(idApi,callback){

       User.sync({force: false}).then(function () {

           // delete the user.
           var deleteUser =  User.destroy({
                  where: {
                    idapiconnection: idApi
                  }

          // callback if the user srequest succeed.
          }).then(function(createUser) {
                  utils.logInfo("controllerUtilisateur(), the request succeed");
                  callback(null,setting.htmlCode.succes_request);

          // return a 500 code if the request is null.
          }).catch(function(error) {
               utils.logInfo("controllerUtilisateur(), the request fail");
              callback(null,setting.htmlCode.unavailable_ressources);
          })

      });
    }    


    this.updateLocation = function (UserDto,callback) {
       utils.logInfo("yolo(), updateUser , updateLocation()");
    }
    
    this.updateUser = function (UserDto,callback){

      // We synchronize with the databse in order to change the name and the 
       User.sync({force: false}).then(function () {

            var updateUser =  User.update({
                lastname: UserDto.lastname,
                firstname : UserDto.firstname,
                description: UserDto.descrition,
              }, 
              {
              where: {
                        idapiconnection: UserDto.idApiConnection
                     }
          // callback if the user srequest succeed.
          }).then(function(updateUser) {
                  utils.logInfo("controllerUtilisateur(), the request succeed");
                  callback(null,setting.htmlCode.succes_request);
                            // return a 500 code if the request is null.
          }).catch(function(error) {
               utils.logInfo("controllerUtilisateur(), the request fail");
              callback(null,setting.htmlCode.unavailable_ressources);
          })

      });
    } 

    var buildRequestFacebook = function(id , accessToken){
        return modele.urlFacebook + id +"?fields="+ modele.filedsFacebook +"&access_token="+ accessToken +"&height=500&width=500"; 
    }
}

module.exports = new controllerUtilisateur();
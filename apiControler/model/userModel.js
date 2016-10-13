// Récupération du Modèle
var modele  = require('./response.js');
var unirest = require('unirest');
var util = require('util');
var error = require('../../setting/error.js');
var databaseConfig = require('../../setting/database.js');
var userDto = require ('../object/user.js')
var utils = require('../utils/Utils.js');

// database
var databasePostgres = require('../database/postgres.js');


// Définition de l'objet controllerUtilisateur
function controllerUtilisateur(){

    this.addUser = function (body,callback)
    {   	
        utils.logDebug("adduser()"+JSON.stringify(buildRequestFacebook(body.id,body.accesToken)));
        // GET the user description by doing a post on facebook API.
        unirest.get(buildRequestFacebook(body.id,body.accesToken)).end(function(res){

          // We can't reach the facebook graph.
          if (res.error) {
           callback(null,error.unavailable_ressources);
          }
          else {
              // make an JsonObject.
              res.body  = JSON.parse(res.body); 
              // build the url to get the picture
              var urlPictureFacebook = "https://graph.facebook.com/"+res.body.id+"/picture?height=500&width=500"; 

              utils.logInfo("controllerUtilisateur(), insertion or geetin a user, adduser()");

              var insertQuery = "insert into usertable (idapiconnection,lastname,firstname,email,birthdate,profilepicture,coverpicture) values("+res.body.id+",'"
                                +res.body.last_name+"','"+res.body.first_name+"','"+res.body.email+"','"+res.body.birthday+"','"
                                +urlPictureFacebook+"','"+res.body.cover.source+"');";

              // execute the query. 
              databasePostgres.postgres.connect(databaseConfig.PostGre.url, function(err, client, done){

                    if(err) {
                        utils.logDebug(err);
                        callback(null,error.unavailable_ressources);
                    }

                    client.query(insertQuery, function(err, result){
                    done();
                      
                    if(err) {
                        utils.logDebug(err);
                        callback(null,error.unavailable_ressources);
                    }
                      userDto.InitizializeFromFacebook(res.body,urlPictureFacebook);

                      var response =  userDto.toJson();
                      utils.logDebug("adduser() dernier appel ! "+JSON.stringify(response));
                      callback(response,error.succes_request);
                  });
              });
            }

        })
    };


    this.getUser = function(idApi,callback){
      utils.logInfo("controllerUtilisateur(), get user "+idApi+", getUser()");

      // Dusan code
    }  


    this.removeUser = function(idApi,callback){

      utils.logInfo("controllerUtilisateur(), delete user "+idApi+", removeUser()");
      var deleteQuery = "DELETE FROM usertable WHERE idapiconnection =" + idApi +";";
      utils.logDebug("removeUser()"+deleteQuery);
      databasePostgres.postgres.connect(databaseConfig.PostGre.url, function(err, client, done){

                  if(err) {
                      callback(null,error.unavailable_ressources);
                  }

                  client.query(deleteQuery, function(err, result){

                      done();
                      if(err) {
                          console.error("An uncaughtException was found, the program will end. " + err + ", stacktrace: " + err.stack);
                          return callback({"success":"false","error":err.stack});
                      }
                      callback(null,error.succes_request);
              });
        });
    }    

    this.updateLocation = function (UserDto,callback) {
       utils.logInfo("yolo(), updateUser , updateLocation()");
    }
    
    this.updateUser = function (UserDto,callback){

       utils.logInfo("controllerUtilisateur(), update User , updateUser()");
       var myDate = new Date(UserDto.birthdate)
       var updateQuery = "update usertable set (lastname,firstname,description,birthdate) = ('"+UserDto.lastname+"','"+UserDto.firstname+"','"
                          +UserDto.descrition +"','"+utils.dateUtilsToString(UserDto.birthdate)+"')where idapiconnection = "+UserDto.idApiConnection+ ";";
      utils.logDebug("removeUser()"+updateQuery);
      databasePostgres.postgres.connect(databaseConfig.PostGre.url, function(err, client, done){

          if(err) {
              return callback(modele.InitizializeBadAnwser(error.operationFailled));
          }
          client.query(updateQuery, function(err, result){
            done();
              // if there are some errors during the connexion.
              if(err) {
                  utils.logError("Controleur User : updateUser() :" + err + ", stacktrace: " + err.stack);
                  callback(null,error.unavailable_ressources);
              }
              // if there are some errors during the connexion.
              else{
                callback(null,error.succes_request);
              }
          });
      }); 
    }

    var buildRequestFacebook = function(id , accessToken){
        return modele.urlFacebook + id +"?fields="+ modele.filedsFacebook +"&access_token="+ accessToken +"&height=500&width=500"; 
    }
}

module.exports = new controllerUtilisateur();
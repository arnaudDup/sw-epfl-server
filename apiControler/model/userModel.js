// Récupération du Modèle
var modele  = require('./response.js');
var unirest = require('unirest');
var util = require('util');
var error = require('../../setting/error.js');
var databaseConfig = require('../../setting/database.js');
var userDto = require ('../objet/usersDto.js')
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

          if (res.error) {
            var response = modele.InitizializeBadAnwser(error.operationFailled);
            callback(response);
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
                        return callback(modele.InitizializeBadAnwser(error.operationFailled));
                    }

                    client.query(insertQuery, function(err, result){
                    done();
                      
                    if(err) {
                        utils.logDebug(err);
                        return callback(modele.InitizializeBadAnwser(error.operationFailled));
                    }
                      userDto.InitizializeFromFacebook(res.body,urlPictureFacebook);

                      var response =  userDto.toJson();
                      utils.logDebug("adduser() dernier appel ! "+JSON.stringify(response));
                      callback(response);
                  });
              });
            }

        })
    };


    this.getUser = function(idApi,callback){
      utils.logInfo("controllerUtilisateur(), get user "+idApi+", getUser()");
    }  


    this.removeUser = function(idApi,callback){

      utils.logInfo("controllerUtilisateur(), delete user "+idApi+", removeUser()");
      var deleteQuery = "DELETE FROM usertable WHERE idapiconnection =" + idApi +";";
      utils.logDebug("removeUser()"+deleteQuery);
      databasePostgres.postgres.connect(databaseConfig.PostGre.url, function(err, client, done){

                  if(err) {
                      return callback(modele.InitizializeBadAnwser(error.operationFailled));
                  }

                  client.query(deleteQuery, function(err, result){

                      done();
                      if(err) {
                          console.error("An uncaughtException was found, the program will end. " + err + ", stacktrace: " + err.stack);
                          return callback({"success":"false","error":err.stack});
                      }
                      callback({"success":"true","error":"No"});
              });
        });
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
              if(err) {
                  utils.logError("Controleur User : updateUser() :" + err + ", stacktrace: " + err.stack);
                  return callback(modele.InitizializeBadAnwser(error.operationFailled));
              }
              else{
                return callback(modele.InitizializeGoodAnwser());
              }
          });
        }); 
    }


    var buildRequestFacebook = function(id , accessToken){
        return modele.urlFacebook + id +"?fields="+ modele.filedsFacebook +"&access_token="+ accessToken +"&height=500&width=500"; 
    }
}

module.exports = new controllerUtilisateur();

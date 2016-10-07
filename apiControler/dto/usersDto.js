var modele  = require('../model/response.js');
var utils = require('../utils/Utils.js');

function UserDto()
{

    this.idApiConnection = null;
    this.backgroundPicture = null;
    this.descrition = "No description informed yet";
    this.firstname = null;
    this.lastname = null;
    this.birthdate = null;
    this.profilePicture = null;
    this.seeBirth = false;


    this.Initizialize  = function (result,idApi){

		utils.logInfo("UserDto(), Construction of userDto by Initizialize()");
		utils.logDebug("UserDto(), affichage de l'objet passé en reference"+JSON.stringify(result));
        this.idApiConnection = idApi;
        this.backgroundPicture = result.coverpicture;
        this.descrition = result.description;
        this.firstname = result.firstname;
        this.lastname = result.lastname;
        this.birthdate = utils.dateUtilsToMili(result.birthdate);
        this.profilePicture = result.profilepicture;
        this.seeBirth = result.seebirth;
    }
    
    this.InitizializeFromFacebook = function (result,aUrlPictureFacebook){

    	utils.logInfo("UserDto(), Construction of userDto by InitizializeFromFacebook()");
    	utils.logDebug("UserDto(), affichage de l'objet passé en reference"+JSON.stringify(result));
        this.idApiConnection = result.id;
        this.backgroundPicture = result.cover.source;
        this.firstname = result.first_name;
        this.lastname = result.last_name;
        this.birthdate = result.birthday;
        this.profilePicture = aUrlPictureFacebook;
    }

    this.toJson= function (){

    	var response = {
	                      'idApiConnection' : this.idApiConnection,
	                      'backgroundPicture': this.backgroundPicture,
	                      'descrition' : this.descrition,
	                      'firstname': this.firstname,
	                      'lastname': this.lastname,
	                      'birthdate': this.birthdate,
	                      'profilePicture' : this.profilePicture,
	                      'seeBirth': this.seeBirth
                		};

        utils.logInfo("UserDto(), Construction of userDto by Initizialize()");
		utils.logDebug("UserDto(), affichage de la response"+JSON.stringify(response));
        return response;
    }

}


// export object
module.exports = new UserDto();
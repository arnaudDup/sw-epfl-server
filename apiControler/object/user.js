var modele  = require('../model/response.js');
var utils = require('../utils/Utils.js');

function UserDto()
{

    this.transformResponseClient = function (UserObject) {

        utils.logInfo("transformResponseClient(), Modify the Json client")
        var locationUser = { 
                     'lattitude' : UserObject.lattitude,
                     'longitude' : UserObject.longitude
                   }

        utils.logInfo(locationUser)

        delete UserObject['lattitude']
        delete UserObject['longitude']

        utils.logInfo(UserObject)

        UserObject.location = locationUser;
        utils.logInfo("transformResponseClient(), return response")
        return UserObject;
    }

    this.computeAge = function (birthdate) {

        utils.logInfo(birthdate);
        var userBirthDate = new Date(birthdate)
        var age = Math.floor( ((new Date).getTime()-userBirthDate.getTime()) / (365.24*24*3600*1000) );
        return age;
    }

}


// export object
module.exports = new UserDto();
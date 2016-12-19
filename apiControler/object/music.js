var utils = require('../utils/Utils.js');

function MusicDto()
{

    this.transformResponseClient = function (musicObject) {

        delete musicObject['updatedAt']
        delete musicObject['createdAt']
        delete musicObject['UserId']
        return musicObject;
    }

}


// export object
module.exports = new MusicDto();
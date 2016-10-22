var pg = require('pg');
var databaseConfig = require('../../setting/database.js');
var utils = require('../utils/Utils.js');
var Sequelize = require('sequelize');

function BaseDeDonnee()
{
    
    this.sequelize = new Sequelize(databaseConfig.PostGre.url);

    // create the schema of the user.
    this.User = this.sequelize.define('Users', {
          idApiConnection: {
            type: Sequelize.BIGINT,
            //unique: 'unique_api_connection'
          },
          firstname           : Sequelize.STRING,
          email               : Sequelize.STRING,
          age                 : Sequelize.INTEGER,
          backgroundPicture   : Sequelize.STRING,
          profilePicture      : Sequelize.STRING,
          descrition          : Sequelize.STRING,
          lastname            : Sequelize.STRING,
          lattitude           : Sequelize.REAL,
          longitude           : Sequelize.REAL,

      },{
          timestamps: false
    })

    // there the next schema...
 
}

var BaseDeDonnee = new BaseDeDonnee();
// export object
module.exports = BaseDeDonnee;

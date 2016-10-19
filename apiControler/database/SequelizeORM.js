var pg = require('pg');
var databaseConfig = require('../../setting/database.js');
var utils = require('../utils/Utils.js');
var Sequelize = require('sequelize');

function BaseDeDonnee()
{
    
    this.sequelize = new Sequelize(databaseConfig.PostGre.url);

    // create the schema of the user.
    this.User = this.sequelize.define('users', {
          idApiConnection: {
            type: Sequelize.BIGINT,
            //unique: 'unique_api_connection'
          },
          firstname : Sequelize.STRING,
          email: Sequelize.STRING,
          birthdate: Sequelize.DATE,
          backgroundPicture : Sequelize.STRING,
          profilePicture: Sequelize.STRING,
          descrition: Sequelize.STRING,
          lastname: Sequelize.STRING
      },{
          timestamps: false
    })

    // there the next schema...
 
}

var BaseDeDonnee = new BaseDeDonnee();
// export object
module.exports = BaseDeDonnee;

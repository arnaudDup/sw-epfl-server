var pg = require('pg');
var databaseConfig = require('../../setting/database.js');
var utils = require('../utils/Utils.js');
var Sequelize = require('sequelize');

function BaseDeDonnee()
{
          // first we select on wich database we are going to work.
      var urlDatabase = null
      if(process.env.NODE_ENV !== 'test') {
          utils.logInfo("Postgres.Database(), run in normal configuration");
          urlDatabase = databaseConfig.PostGre.url
      }
      else {
          utils.logInfo("Postgres.Database(), run for test configuration");
          urlDatabase = databaseConfig.PostGreTest.url
      }

      utils.logInfo("Sequelize database connected to: "+urlDatabase);
      this.sequelize = new Sequelize(urlDatabase);

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
          description          : Sequelize.STRING,
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

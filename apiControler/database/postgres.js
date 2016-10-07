var pg = require('pg');
var databaseConfig = require('../../setting/database.js');
var utils = require('../utils/Utils.js');

function BaseDeDonnee()
{
    // Then we try to connect to the database.
    this.postgres = require('pg');

    this.ConnexionPostgres  = function ()
    {
        // Get a Postgres client from the connection pool
        this.postgres.defaults.ssl = true;
        this.postgres.connect(databaseConfig.PostGre.url, function(err, client, done) 
        {
            // Handle connection errors
            if(err) 
            {
              utils.logError("Postgres.Database(), Connect to postgres database fail ");
            }
            else
            {
              utils.logInfo("Postgres.Database(), Connect to the postgres database success");
            }
        });
    }; 
}

var BaseDeDonnee = new BaseDeDonnee();
// export object
module.exports = BaseDeDonnee;

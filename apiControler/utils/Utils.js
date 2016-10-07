var logger = require('winston'); 

// add timestamp
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {'timestamp':true});
// display debug logger.
logger.level = 'debug';


function Utils()
{

    this.logInfo = function (Messagetolog){
        this.log("info",Messagetolog);
    }
    
    this.logError = function (Messagetolog){
        this.log("error",Messagetolog);
    }

    this.logWarn = function (Messagetolog){
        this.log("warn",Messagetolog);
    }

    this.logDebug = function(Messagetolog){
        this.log("debug",Messagetolog);
    }

    this.log = function (type,Messagetolog){
        logger.log(type,Messagetolog);

    }

    this.dateUtilsToString = function (mydateMili){
        var myDate = new Date(mydateMili)
        //return myDate.getUTCFullYear()+"-"+myDate.getUTCMonth()+"-"+myDate.getUTCDate()
        return myDate.toDateString();
    }

    this.dateUtilsToMili = function (mydateUTC){
        var myDate = new Date(mydateUTC)
        return myDate.getTime();
    }
}


// export object
module.exports = new Utils ();
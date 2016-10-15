var express 		 = require('express');
var router 		     = express.Router();
var path             = require('path');
var modele           = require('../model/response.js');
var userControler    = require('../model/userModel.js');
var error            = require('../../setting/error.js');
var utils            = require('../utils/Utils.js');

// Mach on the route
router.route("/")

    // Create Users.
    .post(function(req,res)
    {
        utils.logInfo(" routing.user(), create a user ");
        utils.logDebug(" routing.user()" + JSON.stringify(req.body));

        // if the body of the request is defined we can rtry to add user
	    if(req.body != undefined){
            // We call user Control with the callback method json to send a Json
    		userControler.addUser(req.body,function(reponse, htmlCode){
  				res.status(htmlCode).json(reponse);
  			});
    	}
        else {
           res.status(error.bad_request).json(null);
        }
    })

// get a user by his id
router.route("/:id")

    // Get the user.
    .get(function(req,res)
    {
        utils.logInfo("routing.user(), get user");
        if(typeof(req.params.id) != 'undefined'){
            userControler.getUser(req.params.id,function(reponse){
                res.json(reponse);
            });
        }
        else{
           res.status(error.bad_request).json(null);
        }
    })

    // Delete a user.
    .delete(function(req,res)
    {
        utils.logInfo("routing.user(), delete user");
        if(typeof(req.params.id) != 'undefined'){
            userControler.removeUser(req.params.id,function(reponse){
                res.json(reponse);
            });
        }
        else{
           res.status(error.bad_request).json(null);
        }
    })

    // Update user information.
    .put(function(req,res)
    {
        utils.logInfo("routing.user(), post to update user");
        utils.logDebug("routing.user()"+JSON.stringify(req.body));
        if(req.body != undefined){
            userControler.updateUser(req.body,function(reponse){
                res.json(reponse);
            });
        }
        else{
           var response = null
           res.status(error.bad_request).json(response);
        }
    });


// get a user by his id
router.route("/around/:id")
    // Get the user.
    .get(function(req,res)
    {
        utils.logInfo("routing.user(), get user");
        if(typeof(req.params.id) != 'undefined'){
            userControler.getUsersAround(req.params.id,req.body,function(reponse){
                res.json(reponse);
            });
        }
        else {
           res.status(error.bad_request).json(null);
        }

    });


// get a user by his id
router.route("/updateInformationsFace")

    .post(function(req,res)
    {
        utils.logInfo(" routing.user(), update Picture user ");
        utils.logDebug(" routing.user()" + JSON.stringify(req.body));
        // if the body of the request is defined we can rtry to add user
        if(req.body != undefined){
            // We call user Control with the callback method json to send a Json
            userControler.updateInformationFacebook(req.body,function(reponse, htmlCode){
                res.status(htmlCode).json(reponse);
            });
        }
        else {
           res.status(error.bad_request).json(null);
        }
    })


module.exports = router;

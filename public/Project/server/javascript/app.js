/**
 * Created by jtakwani on 3/6/16.
 */

module.exports = function (app, db, mongoose) {
    //var http = require('http');
    
    var userModel = require("../models/user.model.server.js")(db, mongoose);
    var userService = require("../services/user.service.server.js")(app, userModel);
    
    var gameModel = require("../models/game.model.server.js")(db, mongoose);
    var gameService = require("../services/game.service.server.js")(app, gameModel, userModel);
    
    var rentModel = require("../models/rent.model.server.js")(db,mongoose);
    var rentService = require("../services/rent.service.server.js")(app, rentModel);

    var reviewModel = require("../models/review.model.server.js")(db,mongoose);
    var reviewService = require("../services/review.service.server.js")(app,reviewModel);

};
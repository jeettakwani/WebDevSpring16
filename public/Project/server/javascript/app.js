/**
 * Created by jtakwani on 3/6/16.
 */

module.exports = function (app, db, mongoose) {
    //var http = require('http');
    var userModel = require("../models/user.model.server.js")(db, mongoose);
    var userService = require("../services/user.service.server.js")(app, userModel);
    var gameModel = require("../models/game.model.server.js")(db, mongoose);
    var gameService = require("../services/game.service.server.js")(app, gameModel, userModel);
    //var fieldService = require("../services/field.service.server.js")(app, formModel);
};
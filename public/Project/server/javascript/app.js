/**
 * Created by jtakwani on 3/6/16.
 */

module.exports = function (app) {
    //var http = require('http');
    var userModel = require("../models/user.model.server.js")();
    var userService = require("../services/user.service.server.js")(app, userModel);
    var gameModel = require("../models/game.model.server.js")();
    var gameService = require("../services/game.service.server.js")(app, gameModel);
    //var fieldService = require("../services/field.service.server.js")(app, formModel);
};
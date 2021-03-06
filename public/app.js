/**
 * Created by jtakwani on 3/6/16.
 */

module.exports = function (app, db, mongoose) {
    //var http = require('http');
    
    var proj_userModel = require("../public/Project/server/models/user.model.server.js")(db, mongoose);
    var userModel = require("../public/Assignments/server/models/user.model.server.js")(db, mongoose);
    var proj_userService = require("../public/Project/server/services/user.service.server.js")(app, proj_userModel,userModel);
    
    var gameModel = require("../public/Project/server/models/game.model.server.js")(db, mongoose);
    var gameService = require("../public/Project/server/services/game.service.server.js")(app, gameModel, proj_userModel);
    
    var rentModel = require("../public/Project/server/models/rent.model.server.js")(db,mongoose);
    var rentService = require("../public/Project/server/services/rent.service.server.js")(app, rentModel);

    var reviewModel = require("../public/Project/server/models/review.model.server.js")(db,mongoose);
    var reviewService = require("../public/Project/server/services/review.service.server.js")(app,reviewModel);

    //assignment//

    //var userModel = require("../public/Assignments/server/models/user.model.server.js")(db, mongoose);
    var formModel = require("../public/Assignments/server/models/form.model.server.js")(db, mongoose);
    var fieldModel = require("../public/Assignments/server/models/field.model.server.js")(db, mongoose);

    var userService = require("../public/Assignments/server/services/user.service.server.js")(app, userModel);
    var formService = require("../public/Assignments/server/services/form.service.server.js")(app, formModel);
    var fieldService = require("../public/Assignments/server/services/field.service.server.js")(app, fieldModel);

};
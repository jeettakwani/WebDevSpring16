/**
 * Created by jtakwani on 4/18/16.
 */

module.exports = function (mongoose) {
    "use strict";


    var ReviewSchema = mongoose.Schema({
        gameName:String,
        gameId: String,
        userId: String,
        username: String,
        text: String,
        rating: Number
    }, {collection: 'project_review'});
    return ReviewSchema;
};
/**
 * Created by jtakwani on 4/8/16.
 */

module.exports = function(mongoose) {
// use mongoose to declare a user schema
    var GameSchema = mongoose.Schema({
        tittle: String,
        year: String,
        price: String,
        platforms: [String],
        userId: String
    }, {collection: 'project_User_Game_Wishlist'});
    return GameSchema;
};
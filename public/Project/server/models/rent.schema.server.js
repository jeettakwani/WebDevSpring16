/**
 * Created by jtakwani on 4/17/16.
 */

module.exports = function(mongoose) {
// use mongoose to declare a user schema
    var RentSchema = mongoose.Schema({
        tittle: String,
        platform: String,
        price: Number,
        usedFor: String,
        availableFor: String,
        userId: String,
        username: String,
        userZip: String
    }, {collection: 'project_user_game_rent'});
    return RentSchema;
};
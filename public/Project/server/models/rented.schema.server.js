/**
 * Created by jtakwani on 4/18/16.
 */

module.exports = function(mongoose) {
// use mongoose to declare a user schema
    var RentedSchema = mongoose.Schema({
        gameId : String,
        gameTittle: String,
        gamePlatform: String,
        gameRenterUserId: String,
        gameRenterUsername: String,
        gameRentedByUserId: String,
        gameRentedBy:String
    }, {collection: 'project_rentedGames'});
    return RentedSchema;
};
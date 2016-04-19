/**
 * Created by jtakwani on 4/8/16.
 */

module.exports = function(mongoose) {
// use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        age: Number,
        email: String,
        address: String,
        zip: String,
        state:String,
        phones: [String],
        membership: String,
        roles: [String],
        points:Number,
        gameList:[String],
        type: String
    }, {collection: 'project_User'});
    return UserSchema;
};
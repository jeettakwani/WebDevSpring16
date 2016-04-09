/**
 * Created by jtakwani on 4/8/16.
 */

module.exports = function(mongoose) {
// use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        address: String,
        zip: String,
        state:String,
        phones: [String],
        roles: [String]
    }, {collection: 'project_User'});
    return UserSchema;
};
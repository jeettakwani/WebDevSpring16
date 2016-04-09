/**
 * Created by jtakwani on 3/25/16.
 */
/**
 * Created by jtakwani on 3/6/16.
 */

var users = require("./user.mock.json");
var q = require('q');
module.exports = function (db, mongoose) {
    "use strict";

    var uuid = require('node-uuid');
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById({_id : userId},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find({},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        UserModel.findOne({username : username,password : password}, function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({username : username},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createUser(user) {

        var deferred = q.defer();

        UserModel.create(user,function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userId) {

        var deferred = q.defer();

        UserModel.remove({_id : userId},function(err,doc)
        {
            if(err)
                deferred.reject(err);
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,loggedInUser)
        {
            if(err)
                deferred.reject(err);
            else
            {
                loggedInUser.firstName = user.firstName;
                loggedInUser.lastName = user.lastName;
                loggedInUser.password = user.password;
                loggedInUser.username = user.username;
                loggedInUser.email = user.email;
                loggedInUser.phones = user.phones;
                loggedInUser.roles = user.roles;
                loggedInUser.save(function (err,doc) {
                    if(err)
                        deferred.reject(err);
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }
};
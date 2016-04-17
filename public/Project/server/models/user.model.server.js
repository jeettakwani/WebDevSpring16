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
    var UserModel = mongoose.model('Proj_User', UserSchema);
    var FriendSchema = require("./friend.schema.server.js")(mongoose);
    var FriendModel = mongoose.model('proj_friends', FriendSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUsersForUser: findUsersForUser,
        findUsersByName: findUsersByName,
        addFollower: addFollower,
        deleteFriendById: deleteFriendById
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
                loggedInUser.firstname = user.firstname;
                loggedInUser.lastname = user.lastname;
                loggedInUser.password = user.password;
                loggedInUser.username = user.username;
                loggedInUser.address = user.address;
                loggedInUser.state = user.state;
                loggedInUser.zip = user.zip;
                loggedInUser.email = user.email;
                loggedInUser.phones = user.phones;
                loggedInUser.roles = user.roles;
                loggedInUser.gameList = user.gameList;
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
    
    function findUsersForUser(userId) {
        var deferred = q.defer();

        FriendModel.find({follower:userId},function(err,users)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findUsersByName(name) {
        var deferred = q.defer();

        var nameList = name.split(" ");
        var firstname = "";
        var lastname = "";
        if (nameList.length > 1) {
            firstname = nameList[0];
            lastname = nameList[1];
            UserModel.find({firstname:firstname,lastname:lastname},function(err,users)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(users);
                }
            });

            return deferred.promise;

        }
        else {
            UserModel.find({firstname:name},function(err,users)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(users);
                }
            });

            return deferred.promise;
        }
    }

    function addFollower(id, following) {
        var deferred = q.defer();

        FriendModel.create(following,function(err,users)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function deleteFriendById(id) {
        var deferred = q.defer();

        FriendModel.remove({following: id},function(err,doc)
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

};
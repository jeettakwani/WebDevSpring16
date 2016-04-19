/**
 * Created by jtakwani on 4/17/16.
 */

var q = require('q');

module.exports = function (db,mongoose) {
    var request = require('request');

    "use strict";

    var uuid = require('node-uuid');
    
    var RentSchema = require("./rent.schema.server.js")(mongoose);
    var RentModel = mongoose.model('rent', RentSchema);
    
    var RentedSchema = require("./rented.schema.server.js")(mongoose);
    var RentedModel = mongoose.model('rented', RentedSchema);

    var api = {
        listGameForUser:listGameForUser,
        updateUserGameListingById: updateUserGameListingById,
        deleteGameFromUserListingById: deleteGameFromUserListingById,
        findRentGamesByUser: findRentGamesByUser,
        findGameByID: findGameByID,
        findAllGamesByGameName: findAllGamesByGameName,
        addGameToUsersRentedList: addGameToUsersRentedList,
        findRentedGamesByUser: findRentedGamesByUser
    };
    return api;
    
    function listGameForUser(game) {
        var deferred = q.defer();

        RentModel.create(game,function(err,doc)
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

    function findRentGamesByUser(id) {
        var deferred = q.defer();

        RentModel.find({userId:id},function(err,doc)
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

    function findRentedGamesByUser(id) {
        var deferred = q.defer();

        RentedModel.find({gameRenterUserId:id},function(err,doc)
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

    function findGameByID(id) {
        var deferred = q.defer();

        RentModel.findById({_id:id},function(err,doc)
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

    function updateUserGameListingById(id, newGame) {
        var deferred = q.defer();

        RentModel.update({_id:id}, {$set:newGame}, function (err,game)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(game);
            }
        });
        return deferred.promise;
    }

    function deleteGameFromUserListingById(id) {
        var deferred = q.defer();

        RentModel.remove({_id:id}, function (err,game)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(game);
            }
        });
        return deferred.promise;
    }

    function findAllGamesByGameName(gameName) {
        var deferred = q.defer();

        RentModel.find({tittle: gameName}, function(err,game)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(game);
            }
        });
        return deferred.promise;
    }

    function addGameToUsersRentedList(game) {
        var deferred = q.defer();

        RentedModel.create(game,function(err,doc)
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
};
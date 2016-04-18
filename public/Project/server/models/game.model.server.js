/**
 * Created by jtakwani on 3/25/16.
 */

/**
 * Created by jtakwani on 3/4/16.
 */

var http = require('http');
var querystring = require('querystring');

var q = require('q');

module.exports = function (db,mongoose) {
    var request = require('request');

    "use strict";

    var uuid = require('node-uuid');
    var GameSchema = require("./game.schema.server.js")(mongoose);
    var GameModel = mongoose.model('Game', GameSchema);

    var baseUrl = "http://www.giantbomb.com/api";
    var apiKey = "33a4f5bd73d5408c13b6da96c011da9b2f635bb8";

    

    var api = {
        findGameByTitle: findGameByTitle,
        findGameByID: findGameByID,
        createGameForUser: createGameForUSer,
        findAllGamesForUser: findAllGamesForUser,
        deleteGameById: deleteGameById,
        updateGameById: updateGameById
    };
    return api;

    function findGameByTitle(title,callback) {
        /*var params = {
            api_key: apiKey,
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK',
                resources: 'game',
                limit: '20',
                query: title
        };
        request({url:'http://www.giantbomb.com/api/search/', method:'GET',qs:params}, function(error,response,body) {
            if(!error && response.statusCode == 200) {
                callback(body);
            }
        });
        //var endpoint += '?' + querystring.stringify(title);
        //var req = http.request()
        /*return http.get('http://www.giantbomb.com/api/search/', {
            
        });*/
    }

    function findGameByID(id) {
        /*console.log(id);
        return $http.get('http://www.giantbomb.com/api/game/'+id+'/', {
            params: {
                api_key: apiKey,
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK',
                limit: '20'
            }
        });*/
    }

    function createGameForUSer(id,game) {
        var deferred = q.defer();

        GameModel.create(game,function(err,doc)
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

    function findAllGamesForUser(userId)
    {
        var deferred = q.defer();

        GameModel.find({userId : userId},function(err,doc)
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

    function deleteGameById(gameId)
    {
        var deferred = q.defer();

        GameModel.remove({_id : gameId},function(err,doc)
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

    function updateGameById(gameId, newGame) {
        var game;
        for(game in games) {
            if(games[game]._id == gameId)
            {
                games[game] = newGame;
                return games;
            }

        }
        return null;
    }
    
};
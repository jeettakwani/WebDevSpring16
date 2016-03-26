/**
 * Created by jtakwani on 3/25/16.
 */

/**
 * Created by jtakwani on 3/4/16.
 */

var games = require('./game.mock.json');
var http = require('http');
var querystring = require('querystring');

module.exports = function ($http) {
    var request = require('request');

    "use strict";

    var uuid = require('node-uuid');
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

    function createGameForUSer(userId, game) {
        games.userId = userId;
        games.push(game);
        return games;
    }

    function findAllGamesForUser(userId)
    {
        var userGame = [];
        for(var g in games) {
            if(games[g].userId == userId)
            {
                userGame.push(games[g]);
            }
        }
        return userGame;
    }

    function deleteGameById(gameId)
    {
        var game;
        for(game in games) {
            if(games[game]._id == gameId) {
                games.splice(game,1);
                return games;
            }
        }
        return null;
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
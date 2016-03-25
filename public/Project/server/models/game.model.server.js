/**
 * Created by jtakwani on 3/25/16.
 */

/**
 * Created by jtakwani on 3/4/16.
 */

var game = require('./game.mock.json');

module.exports = function () {

    "use strict";

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

    function findGameByTitle(title) {
        return $http.jsonp('http://www.giantbomb.com/api/search/', {
            params: {
                api_key: apiKey,
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK',
                resources: 'game',
                limit: '20',
                query: title
            }
        });
    }

    function findGameByID(id) {
        console.log(id);
        return $http.jsonp('http://www.giantbomb.com/api/game/'+id+'/', {
            params: {
                api_key: apiKey,
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK',
                limit: '20'
            }
        });
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
            if(games[g].userId === userId)
            {
                userGame.push(games[g]);
            }
        }
        return userGame;
    }

    function deleteGameById(gameId)
    {
        for(game in games) {
            if(games[game]._id == gameId) {
                games.splice(game);
                break;
            }
        }
        return games;
    }

    function updateGameById(gameId, newGame) {

        for(game in games) {
            if(games[game]._id == gameId)
            {
                games[game] = newGame;
                return newGame;
            }

        }
        return null;
    }
    
};
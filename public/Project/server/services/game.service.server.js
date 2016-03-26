/**
 * Created by jtakwani on 3/25/16.
 */
module.exports = function(app,model) {
    "use strict";

    var uuid = require('node-uuid');
    app.get('/api/project/game',getGameByTitle);
    app.get('api/project/game/:id',getGameById);
    app.get('/api/project/user/:id/game',getGamesForUser);
    app.post('/api/project/user/:id/game',createGameForUser);
    app.put('/api/project/game/:id',updateGameById);
    app.delete('/api/project/game/:id',deleteGameById);
    
    function createGameForUser(req, res) {
        var userId = req.params.id;
        var g = req.body;

        var game = model.createGameForUser(userId, g);
        if(game) {
            res.json(game);
            return;
        }
        res.json('Could not create game for user')
    }

    function getGameById(req, res) {
        var gameId = req.params.id;

        var game = model.findGameByID(gameId);

        if(game) {
            res.json(game);
            return;
        }
        res.json('Game Not Found')
    }

    function getGameByTitle(req, res) {
        var title = req.query.title;

        var game = model.findGameByTitle(title, function(response) {
            //res.send(response);
            if(response) {
                res.json(response);
                return;
            }
            res.json('Game Not Found');
        });
    }

    function getGamesForUser(req, res) {
        var userId = req.params.id;

        var games = model.findAllGamesForUser(userId);

        if(games) {
            res.json(games);
            return;
        }
        res.json('Games not found');
    }

    function updateGameById(req, res) {
        var gameId = req.params.id;
        var game = req.body;

        game = model.updateGameById(gameId, game);

        if(game) {
            res.send(200);
            return;
        }
        res.json(404);
    }

    function deleteGameById(req, res) {
        var gameId = req.params.id;

        var games = model.deleteGameById(gameId);

        if(games) {
            res.json(games);
            return;
        }
        res.json("Game Not deleted");
    }
};
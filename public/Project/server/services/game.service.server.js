/**
 * Created by jtakwani on 3/25/16.
 */
module.exports = function(app,model, userModel) {
    "use strict";

    var uuid = require('node-uuid');
    app.get('/api/project/game',getGameByTitle);
    app.get('api/project/game/:id',getGameById);
    app.get('/api/project/user/:id/game',getGamesForUser);
    app.post('/api/project/user/:id/game',createGameForUser);
    app.put('/api/project/game/:id',updateGameById);
    app.delete('/api/project/game/:id',deleteGameById);
    
    function createGameForUser(req, res) {
        var id = req.params.id;
        var game = req.body;

        userModel.findUserById(id)
            .then(
                function (user) {
                    user.gameList.push(game.tittle);

                    userModel.updateUser(id,user)
                        .then(
                            function(doc) {
                                model
                                    .createGameForUser(id,game)
                                    .then(
                                        function (doc) {
                                            res.json(doc);
                                        },
                                        function (err) {
                                            res.status(400).send(err);
                                        }
                                    );
                            },
                            function (err) {

                            }
                        );
                },
                function (err) {

                }
            );
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

        model.findAllGamesForUser(userId)
            .then(function(games){
                    res.json(games);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
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
        var id = req.params.id;
        

            model.deleteGameById(id)
                .then(
                    function (doc) {
                        res.json(doc)
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        
    }
};
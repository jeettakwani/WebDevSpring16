/**
 * Created by jtakwani on 4/17/16.
 */

module.exports = function(app,model) {
    "use strict";

    app.post('/api/project/user/:id/listGame', listGamesForUser);

    app.get('/api/project/user/:id/myRentGames', getRentGamesByUser);
    
    app.get('/api/project/user/rent/game/:id', getGameById);

    app.put('/api/project/user/rent/updateGame/:id',updateUserGameListingById);

    app.delete('/api/project/user/rent/delGame/:id', deleteUserListingGameById);

    app.get('/api/project/user/rent/searchGames', getAllGamesByGameName);

    app.post('/api/project/user/rent/', rentGame);

    function listGamesForUser(req, res) {
        var id = req.params.id;
        var game = req.body;
        model
            .listGameForUser(game)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getRentGamesByUser(req, res) {
        var id = req.params.id;

        model
            .findRentGamesByUser(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    
    function getGameById(req, res) {
        var id = req.params.id;
        
        model
            .findGameByID(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserGameListingById(req, res) {
        var id = req.params.id;
        var newGame = req.body;

        model
            .updateUserGameListingById(id, newGame)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserListingGameById(req, res) {
        var id = req.params.id;

        model
            .deleteGameFromUserListingById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllGamesByGameName(req, res) {
        var gameName = req.query.gameName;

        model
            .findAllGamesByGameName(gameName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function rentGame(req, res) {
        var game = req.body;

        model
            .addGameToUsersRentedList(game)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};
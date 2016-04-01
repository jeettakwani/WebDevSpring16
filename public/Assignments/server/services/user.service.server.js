module.exports = function (app, model) {
    "use strict";
    var uuid = require('node-uuid');
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user/:id', getUserById);
    app.all('/api/assignment/user', function (req, res, next) {
        if (req.query.username != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else if (req.query.username && !req.query.password) {
            findUserByUsername(req, res);
        }
        else {
            next();
        }
    });
    app.get('/api/assignment/user', getAllUsers);

    app.put('/api/assignment/user/:userId', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);


    function createUser(req, res) {
        var user = req.body;
        var id =  uuid.v4();
        //user._id = id;
        model.createUser(user)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = model.findUserById(id)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res) {
        console.log(req.query.username == null);
        var users = model.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findUserByUsername(req, res) {

        var username = req.query.username;
        var user = model.findUserByUsername(username)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var user = model.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;

        model.updateUser(id,user)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        var user = model.deleteUserById(id)
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
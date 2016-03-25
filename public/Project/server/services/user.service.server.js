/**
 * Created by jtakwani on 3/25/16.
 */
module.exports = function (app, model) {
    "use strict";

    app.post('/api/project/user', createUser);
    app.get('/api/project/user/:id', getUserById);
    app.all('/api/project/user', function (req, res, next) {
        if (req.query.username != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else if (req.query.username && !req.query.password) {
            findUserByUsername(req, res);
        }
        else {
            next();
        }
    });
    app.get('/api/project/user', getAllUsers);

    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);


    function createUser(req, res) {
        var user = req.body;
        var id =  uuid.v4();
        user._id = id;
        user = model.createUser(user);
        if (user) {
            res.send(200);
            return;
        }
        res.json({message: "User not created"});
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getAllUsers(req, res) {
        console.log(req.query.username == null);
        var users = model.findAllUsers();
        res.json(users);
    }


    function findUserByUsername(req, res) {

        var username = req.query.username;
        var user = model.findUserByUsername(username);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User Not found"});
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var user = model.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User Not found"});
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;

        var user = model.updateUser(id,user);
        if (user) {
            res.send(200);
            return;
        }
        res.send(404);
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        if (model.deleteUserById(id)) {
            res.send(200);
            return;
        }
        res.json({message: "User not found"});
    }


}
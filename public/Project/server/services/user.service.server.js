/**
 * Created by jtakwani on 3/25/16.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require("mongoose");


module.exports = function (app, model) {
    "use strict";

    var uuid = require('node-uuid');
    var auth = authorized;

    app.all('/api/project/user', function (req, res, next) {
        if (req.query.username != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else if (req.query.username && !req.query.password) {
            findUserByUsername(req, res);
        } else if (req.query.name) {
            getUsersByName(req, res);
        }
        else {
            next();
        }
    });

    app.post('/api/project/login', passport.authenticate('local'), login);

    app.post('/api/project/logout',      logout);

    app.post('/api/project/register',   register);

    app.post('/api/project/loggedin',   loggedin);
    
    app.get('/api/project/user/:id',    getUserById);

    app.get('/api/project/user',        getAllUsers);

    app.post('/api/project/user',       createUser);

    app.put('/api/project/user/:id',    updateUser);

    app.delete('/api/project/user/:id', deleteUser);
    
    app.get('/api/project/:id/following', getUsersForUser);

    app.post('/api/project/user/:id/follower', addFollower);

    app.delete('/api/project/user/following/:id', deleteFriendForUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()){
            res.send(req.user);
        }else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function  createUser(req, res) {
        var newUser = req.body;
        delete newUser['_id'];
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }

        // first check if a user already exists with the username
        model
            .createUser(newUser)
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
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
        if(isAdmin(req.user)) {
            model
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
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
        var id = req.params.id;
        var user = req.body;

        if(!isAdmin(user)) {
            delete user.roles;
        }
        if(typeof user.roles == "string") {
            user.roles = user.roles.split(",");
        }


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
        if(isAdmin(req.user)) {

            var user = model.deleteUserById(id)
                .then(
                    function (doc) {
                        res.json(doc)
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
    
    function getUsersForUser(req, res) {
        var id = req.params.id;
        
        model.findUsersForUser(id)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUsersByName(req, res) {
        var name = req.query.name;

        model.findUsersByName(name)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFollower(req, res) {
        var id = req.params.id;
        var user = req.body;

        var following = {following:user._id, follower:id, following_firstname: user.firstname,
        following_lastname:user.lastName};

        model.addFollower(id,following)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFriendForUser(req, res) {
        var id = req.params.id;
        model.deleteFriendById(id)
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
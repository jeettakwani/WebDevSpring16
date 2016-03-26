/**
 * Created by jtakwani on 3/25/16.
 */
/**
 * Created by jtakwani on 3/6/16.
 */

var users = require("./user.mock.json");

module.exports = function () {
    "use strict";

    var uuid = require('node-uuid');
    var api = {
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserById(userId) {
        for (var u in users) {
            if (users[u]._id == userId)
                return users[u];
        }
        return null;

    }

    function findAllUsers() {
        return users;
    }

    function findUserByCredentials(username, password) {
        for (var user in users) {

            if (users[user].username === username && users[user].password === password) {
                return users[user];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var user in users) {

            if (users[user].username === username) {
                return users[user];
            }
        }
        return null;
    }

    function createUser(user) {

        users.push(user);

        return user;
    }

    function deleteUserById(userId) {

        for (var user in users) {
            if (users[user]._id == userId) {
                users.splice(user, 1);
            }
        }
        return users;
    }

    function updateUser(userId, user) {
        for (var u in users) {
            if (users[u]._id == userId) {
                users[u] = user;
                return user;
            }
        }
        return null;
    }
};
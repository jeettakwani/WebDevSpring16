/**
 * Created by jtakwani on 3/6/16.
 */

var users = require('./user.mock.json');

module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {
        users.push(user);
        return user;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(userId) {
        for (var user in users) {
            if(users[user]._id == userId)
            return users[user]
        }
        return null
    }

    function updateUser(userId, user) {
        for (var u in users) {
            if(users[u]._id == userId) {
                user[u] = user;
                return users
            }
        }
        return null;
    }

    function deleteUser(userId) {
        for (var u in users) {
            if (users[u]._id == userId) {
                users.splice(u, 1);
                return true;
            }
        }
        return false;
    }

    function findUserByUsername(username) {
        for (var u in users) {
            if(users[u].username == username) {
                return user;
            }
        }

    }

    function findUserByCredentials(credentials) {
        for (var u in users) {
            if(users[u].username == credentials.username &&
                users[u].password == credentials.password) {
                return user;
            }
        }
        return null;
    }
};
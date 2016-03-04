/**
 * Created by jtakwani on 3/3/16.
 */
(function() {
    "use strict";
    angular
        .module("GameRental")
        .factory("UserService", userService);

    function userService() {
        var user, u;

        var users = [
            {"_id": 123, "firstName": "Alice",            "lastName": "Wonderland",
                "username": "alice",  "password": "alice",   "roles": ["student"] },

            {"_id": 234, "firstName": "Bob",              "lastName": "Hope",
                "username": "bob",    "password": "bob",     "roles": ["admin"] },

            {"_id": 345, "firstName": "Charlie",          "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"] },

            {"_id": 456, "firstName": "Dan",              "lastName": "Craig",
                "username": "dan",    "password": "dan",     "roles": ["faculty", "admin"]},

            {"_id": 567, "firstName": "Edward",           "lastName": "Norton",
                "username": "ed",     "password": "ed",      "roles": ["student"] }
        ];

        function findAllUsers(callback) {
            callback(users);
        }

        function findUserByCredentials(username, password, callback) {
            for(user in users) {

                if(users[user].username === username && users[user].password === password) {
                    callback(users[user]);
                }
            }
        }

        function createUser(user, callback) {
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {

            for(user in users) {
                if(user._id == userId) {
                    users.splice(user);
                }
                callback(users);
            }
        }

        function updateUser(userId, user, callback) {
            for(u in users) {
                if(u._id == userId)
                {
                    users[user] = user;
                    break;
                }

            }
            callback(user);
        }

        var service = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;
    }
})();
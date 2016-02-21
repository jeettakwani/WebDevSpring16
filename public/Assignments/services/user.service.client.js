/**
 * Created by jtakwani on 2/20/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ]

        var service = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findAllUsers(callback) {
            return users;
        }

        function findUserByCredentials(username, password, callback)
        {
            for(user in users) {
                if(user.username == username && user.password == password)
                return user;
            }
        }

        function createUser(user, callback) {
            _id = (new Date).getTime();
            user[_id] = _id;
            users.add(user);
            return users;
        }

        function deleteUserById(userId, callback) {

            for(user in users) {
                if(user._id == userId)
                users.splice(user);
                return users;
            }
        }

        function updateUser(userId, user, callback) {
            for(u in users) {
                if(u._id == userId)
                    u = user;
                return users
            }
        }

    }
})();
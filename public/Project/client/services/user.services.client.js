/**
 * Created by jtakwani on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("GameRental")
        .factory("UserService", userService);

    function userService($http) {

        var service = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername
        };

        return service;

        function findAllUsers() {
            return $http.get('/api/project/user');
        }

        function createUser(user) {
            return $http.post('/api/project/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/'+ userId, user);
        }

        function findUserByCredentials(username, password) {

            return $http.get('/api/project/user?username='+ username
                +'&password=' + password);
        }


        function findUserByUsername(username) {
            return $http.get('/api/project/user?username=' + username);
        }

    }
})();
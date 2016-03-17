/**
 * Created by jtakwani on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
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
            return $http.get('/api/assignment/user');
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user'+ userId, user);
        }

        function findUserByCredentials(username, password) {

            $http.get('/api/assignment/user?username'+ username
                +'&password=' + password);
        }


        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

    }
})();
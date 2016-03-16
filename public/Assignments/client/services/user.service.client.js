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

        function findUserByCredentials(username, password) {
            var credentials = {
                username: username,
                password: password
            };

            $http.get('/api/user/', credentials)
                .success(function (response) {
                    return response
                });
        }

        function createUser(user) {
            $http.post('/api/user', user)
                .success(function (response) {
                    return response;
                });
        }

        function deleteUserById(userId) {
            $http.delete('/api/user', userId)
                .success(function (response) {
                    return response
                });

        }

        function updateUser(userId, user) {
            var data = {
                userId: userId,
                user: user
            };

            $http.put('/api/user', data)
                .success(function (response) {
                    return response;
                });
        }

        function findUserByUsername(username) {
            $http.get('', username)
                .success(function (response) {
                    return response;
                });
        }

    }
})();
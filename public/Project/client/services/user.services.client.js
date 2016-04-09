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
            login: login,
            register: register,
            logout: logout,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername
        };

        return service;

        function login(user) {
            return $http.post('api/project/login',user);
        }

        function register(user) {
            return $http.post('api/project/register',user);
        }

        function logout() {
            return $http.post('api/project/logout');
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

        function findAllUsers() {
            return $http.get('/api/project/user');
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
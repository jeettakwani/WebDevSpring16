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
            findUserByUsername: findUserByUsername,
            findAllUsersForUser: findAllUsersForUser,
            findUserByName: findUserByName,
            addFollower: addFollower,
            deleteFriendById:deleteFriendById
        };

        return service;

        function login(user) {
            return $http.post('/api/project/login',user);
        }

        function register(user) {
            return $http.post('/api/project/register',user);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }

        function createUser(user) {
            return $http.post('/api/project/user', user);
        }

        function deleteUserById(id) {
            return $http.delete('/api/project/user/' + id);
        }

        function updateUser(id, user) {
            return $http.put('/api/project/user/'+ id, user);
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

        function findAllUsersForUser(userId) {
            return $http.get('/api/project/'+ userId +'/following');
        }

        function findUserByName(name) {
            return $http.get('/api/project/user?name='+name);
        }

        function addFollower(user, id) {
            return $http.post('/api/project/user/'+ id + '/follower', user);
        }

        function deleteFriendById(id) {
            return $http.delete('/api/project/user/following/' + id)
        }
    }
})();
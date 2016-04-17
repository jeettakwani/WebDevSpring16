/**
 * Created by jtakwani on 4/16/16.
 */

( function () {
    "use strict";
    angular
        .module("GameRental")
        .controller("FollowerController", FollowerController);

    function FollowerController($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.games = {};

        if($rootScope.user != null){
            UserService.findAllUsersForUser($scope.user._id).then(function(response){
                $scope.friends = response.data;
            });
        }

        $scope.addGame = function () {

            var newGame = {

                _id :  (new Date()).getTime(),
                title : $scope.gameName,
                userId : $scope.rootScope.user._id
            };


            GameService.createGameForUser($scope.rootScope.user._id, newGame).then(
                function (response) {
                    $scope.gameName = "";
                    console.log(response);
                    GameService.findAllGamesForUser($scope.rootScope.user._id).then(function(response){
                        $scope.games = response.data;
                    });
                });

        };

        $scope.update = function () {

            var newGame = {

                _id :  $scope.games[$scope.selectedGameIndex]._id,
                title : $scope.gameName,
                userId : $scope.rootScope.user._id


            };


            GameService.updateGameById($scope.games[$scope.selectedGameIndex]._id,newGame).then(function(response){
                $scope.GameName = "";
                GameService.findAllGamesForUser($scope.rootScope.user._id).then(function(response){
                    $scope.games = response.data;
                });
            });
        };



        $scope.selectGame = function (index) {
            $scope.selectedGameIndex = index;
            $scope.gameName = $scope.games[index].title;
        };

        $scope.removeFriend = function (index) {
            $scope.selectedGameIndex = index;

            UserService.deleteFriendById($scope.friends[index].following).then(function(response) {
                UserService.findAllUsersForUser($rootScope.user._id).then(function(response){
                    $scope.friends = response.data;
                });
            });
        };

    }
})();
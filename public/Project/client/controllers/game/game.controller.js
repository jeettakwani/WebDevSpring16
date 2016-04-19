/**
 * Created by jtakwani on 3/8/16.
 */

( function () {
    "use strict";
    angular
        .module("GameRental")
        .controller("GameController", GameController);

    function GameController($rootScope, $scope, $location, GameService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.games = {};

        if($rootScope.user != null){
            GameService.findAllGamesForUser($scope.user._id).then(function(response){
                $scope.games = response.data;
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
            $scope.gameName = $scope.games[index].tittle;
            $location.path('/rentGames/'+$scope.gameName);
        };

        $scope.removeGame = function (index) {
            $scope.selectedGameIndex = index;

            GameService.deleteGameById($scope.games[index]._id).then(function(response) {
                GameService.findAllGamesForUser($rootScope.user._id).then(function(response){
                    $scope.games = response.data;
                });
            });
        };

    }
})();
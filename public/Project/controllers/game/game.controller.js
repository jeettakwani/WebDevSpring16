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
        $scope.rootScope = $rootScope;
        $scope.games = {}

        if($rootScope.user != null){
            GameService.findAllGamesForUser($scope.rootScope.user._id,function(response){
                $scope.games = response;
            });
        }

        $scope.addGame = function () {

            var newGame = {

                _id :  (new Date()).getTime(),
                title : $scope.gameName,
                userId : $scope.rootScope.user._id
            }


            GameService.createGameForUser($scope.rootScope.user._id, newGame,
                function (response) {
                    $scope.gameName = "";
                    console.log(response);
                    GameService.findAllGamesForUser($scope.rootScope.user._id,function(response){
                        $scope.games = response;
                    });
                });

        };

        $scope.update = function () {

            var newGame = {

                _id :  $scope.games[$scope.selectedGameIndex]._id,
                title : $scope.gameName,
                userId : $scope.rootScope.user._id


            }


            GameService.updateGameById($scope.games[$scope.selectedGameIndex]._id,newGame,function(response){
                $scope.GameName = "";
                GameService.findAllGamesForUser($scope.rootScope.user._id,function(response){
                    $scope.games = response;
                });
            });
        };



        $scope.selectGame = function (index) {
            $scope.selectedGameIndex = index;
            $scope.gameName = $scope.games[index].title;
        };

        $scope.removeGame = function (index) {
            $scope.selectedGameIndex = index;

            GameService.deleteGameById($scope.games[index]._id, function (response) {
                GameService.findAllGamesForUser($scope.rootScope.user._id,function(response){
                    $scope.gamrs = response;
                });
            });
        };

    }
})();
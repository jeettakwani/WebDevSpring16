/**
 * Created by jtakwani on 4/17/16.
 */

( function () {
    "use strict";
    angular
        .module("GameRental")
        .controller("RentController", RentController);

    function RentController($rootScope, $scope, $routeParams, $location, RentService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.availableRentGames = {};
        $scope.addButton = true;
        $scope.editButton = false;

        $scope.toggleButtons = function() {
            $scope.addButton = !$scope.addButton;
            $scope.editButton = !$scope.editButton;
        };

        if($rootScope.user != null){
            RentService.findRentGamesByUser($scope.user._id).then(function(response){
                console.log(response.data);
                $scope.availableRentGames = response.data;
            });
        }


        if($routeParams._id != null) {
            $scope.toggleButtons();
            console.log($routeParams._id);
            RentService.findGameByID($routeParams._id)
                .then(
                    function (response) {
                        console.log(response.data);
                        $scope.gameName = response.data.tittle;
                        $scope.platform = response.data.platform;
                        $scope.price = response.data.price;
                        $scope.usedFor = response.data.usedFor;
                        $scope.availableFor = response.data.availableFor;
                    }
                );
        }

        $scope.findGamesForUser = function () {
            RentService.findRentGamesByUser($scope.user._id).then(function (response) {
                $scope.availableRentGames = response.data;
            });
        }


        $scope.addGameForRent = function () {

            var newGame = {
                tittle: $scope.gameName,
                platform: $scope.platform,
                price: $scope.price,
                usedFor: $scope.usedFor,
                availableFor: $scope.availableFor,
                userId: $scope.user._id,
                username: $scope.user.username,
                userZip: $scope.user.zip
            };

            RentService.ListGameByUser($scope.user._id, newGame).then(
                function (response) {
                    $location.path('/canRent')
                });

        };

        $scope.edit = function(index) {

            var newGame = {
                tittle: $scope.gameName,
                platform: $scope.platform,
                price: $scope.price,
                usedFor: $scope.usedFor,
                availableFor: $scope.availableFor,
                userId: $scope.user._id,
                uername: $scope.user.username,
                userZip: $scope.user.zip
            };

            RentService.updateGameListingById($routeParams._id,newGame).then(function(response){
                $scope.findGamesForUser();
                $location.path('/canRent');
            });
        };



        $scope.selectGame = function(index) {
            $scope.selectedGameIndex = index;
            $scope.gameName = $scope.games[index].title;
        };

        $scope.removeGame = function(index) {
            $scope.selectedGameIndex = index;

            RentService.deleteRentGameById($scope.availableRentGames[index]._id)
                .then(function(response) {
                    $scope.findGamesForUser();
            });
        };
        
        $scope.search = function(gameTittle) {
            RentService.findAllGamesByName(gameTittle)
                .then(
                    function (response) {
                        $scope.games = response.data
                    }
                );
        };

        if($routeParams.gameName != null) {
            $scope.search($routeParams.gameName);
        }
    }
})();
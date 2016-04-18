/**
 * Created by jtakwani on 4/18/16.
 */

(function () {
    "use strict";
    angular
        .module("GameRental")
        .controller("CheckoutController", CheckoutController);

    function CheckoutController($rootScope, $scope, $routeParams, $location, RentService) {

        var user = $rootScope.user;
        
        var id = $routeParams.id;

        if($rootScope.user != null) {
            RentService.findGameByID(id)
                .then(
                    function(response) {
                        $scope.item = response.data;
                    }
                );
        }

        $scope.deleteFromListing = function (id) {
            RentService.deleteRentGameById(id)
                .then(function(response) {
                    $location.path('/successful')
                });
        };

        $scope.order = function() {

            var rentedGame = {
                gameId : $scope.item._id,
                gameTittle: $scope.item.tittle,
                gamePlatform: $scope.item.platform,
                gameRenterUserId: $rootScope.user._id,
                gameRenterUsername: $rootScope.user.username,
                gameRentedByUserId: $scope.item.userId,
                gameRentedBy:$scope.item.username
            };
            RentService.rentGame(rentedGame)
                .then(
                    function(response) {
                        $scope.deleteFromListing(id);
                    }
                );
        }
    }

})();
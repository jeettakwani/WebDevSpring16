/**
 * Created by jtakwani on 3/3/16.
 */

(function()
{
    angular
        .module("GameRental")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.users = {}
        $scope.$location = $location;
        UserService.findAllUsers(function(response){
            "use strict";
            $scope.users = response;
        });

        $scope.hide = true;
        $scope.dispalert = false;


        $scope.register = function() {
            if($scope.password != $scope.verifyPassword)
                dispalert = true;

            $rootScope.user = {};
            $scope.dispalert = false;
            $rootScope.user.username = $scope.username;
            $rootScope.user.password = $scope.password;
            $rootScope.user.email = $scope.email;
            $rootScope.user._id = (new Date).getTime();

            UserService.createUser($rootScope.user,
                function(response) {
                    console.log(response);
                });

            $location.path("/complete");
        };

        $scope.goToPayment = function() {
            $scope.$location.path("/pricing")
        }

        $scope.select = function() {
            $scope.$location.path("/profile")
        }


    }



})();
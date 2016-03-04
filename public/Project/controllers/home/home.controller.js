/**
 * Created by jtakwani on 3/3/16.
 */

(function()
{
    "use strict";


    angular
        .module("GameRental")
        .controller("HomeController", HomeController);

    function HomeController($rootScope,$scope, $location, UserService) {

        $scope.hide = true;
        $scope.dispalert = false;
        $scope.$location = $location;

        $scope.login = function() {


            //$rootScope.user = $scope.user;

            UserService.findUserByCredentials($scope.username, $scope.password,
                function(response) {
                    if(response) {
                        console.log(response);
                        $rootScope.user = response;
                        $location.path("/profile");
                    }
                    else {
                        $scope.dispalert = true;
                    }

                });


        };

        $scope.goToRegister = function() {
            $scope.$location.path("/register");
        };


    }



})();
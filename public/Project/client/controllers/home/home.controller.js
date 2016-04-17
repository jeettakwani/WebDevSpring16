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
            var username = $scope.username;
            var password = $scope.password;

            var user = {username:username, password:password};

            UserService.login(user).then(function(response){

                if (response) {
                    console.log(response);
                    $rootScope.user = response.data;
                    console.log($rootScope.user);
                    $location.path("/search");
                }
            });


        };

        $scope.goToRegister = function() {
            $scope.$location.path("/register");
        };


    }



})();
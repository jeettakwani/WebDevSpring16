/**
 * Created by jtakwani on 2/19/16.
 */

(function () {
    angular
        .module("GameRental")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.users = {};
        //UserService.findAllUsers().then(function (response) {
         //   "use strict";
           // $scope.users = response;
        //});

        $scope.hide = true;
        $scope.dispalert = false;


        $scope.register = function (option) {
            $rootScope.user.membership = option;
            UserService.register($rootScope.user).then(
                function (response) {
                    $rootScope.user = response.data;
                });

            $location.path("/complete");
        };

        $scope.goToPayment = function() {
            if ($scope.password != $scope.verifyPassword)
                dispalert = true;

            $rootScope.user = {};
            $scope.dispalert = false;
            $rootScope.user.username = $scope.username;
            $rootScope.user.password = $scope.password;
            $rootScope.user.firstname = $scope.firstname;
            $rootScope.user.lastname = $scope.lastname;
            $rootScope.user.address = "";
            $rootScope.user.state = "";
            $rootScope.user.zip = "";
            $rootScope.user.email = $scope.email;

            $scope.$location.path("/pricing")
        };

        $scope.select = function() {
            $scope.$location.path("/profile")
        };
        
    }


})();
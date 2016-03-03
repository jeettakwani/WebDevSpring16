/**
 * Created by jtakwani on 2/19/16.
 */

(function()
{
    "use strict";


    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope,$scope, $location, UserService) {

        $scope.hide = true;
        $scope.dispalert = false;


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


    }



})();
/**
 * Created by jtakwani on 2/19/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        "use strict";


        $scope.login = function(){

            $scope.user = {username: $scope.username, password:$scope.password};

            UserService.login($scope.user).then(function(response){

                if (response) {
                    console.log(response);
                    $rootScope.user = response.data;
                    console.log($rootScope.user);
                    $location.path("/profile");
                }
            });
        };

    }

})();
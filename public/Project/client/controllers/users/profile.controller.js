/**
 * Created by jtakwani on 2/19/16.
 */

(function(){
    angular
        .module("GameRental")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,$scope, $location, UserService) {
        "use strict";

        $scope.user = $rootScope.user;
        console.log($rootScope.user);

        $scope.username = $scope.user.username;
        $scope.firstName = $scope.user.firstName;
        $scope.lastName = $scope.user.lastName;
        $scope.password = $scope.user.password;
        $scope.email = $scope.user.email;

        $scope.update = function(){

            var user = {};
            user._id = this.user._id;
            user.username = this.username;
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.password = this.password;
            user.roles = this.user.roles;

            UserService.updateUser(user._id,user).then(function(response){
                 user = response.data;
                $scope.username = user.username;
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
                $scope.password = user.password;
                $scope.email = user.email;

            });

            $location.path("/profile");
        };



    }

})();

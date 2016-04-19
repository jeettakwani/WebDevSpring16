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
        $scope.firstname = $scope.user.firstname;
        $scope.lastname = $scope.user.lastname;
        $scope.address = $scope.user.address;
        $scope.state = $scope.user.state;
        $scope.zip = $scope.user.zip;
        $scope.email = $scope.user.email;
        $scope.membership = $scope.user.membership;

        $scope.update = function(){

            var user = {};
            user._id = this.user._id;
            user.username = this.username;
            user.firstname = this.firstname;
            user.lastname = this.lastname;
            user.address = this.address;
            user.state = this.state;
            user.zip = this.zip;
            user.email = this.email
            user.roles = this.user.roles;

            UserService.updateUser(user._id,user).then(function(response){
                 $rootScope.user = response.data;
                // $rootScope.user.username = user.username;
                // $scope.firstname = user.firstname;
                // $scope.lastname = user.lastname;
                // $scope.password = user.password;
                // $scope.address = user.address;
                // $scope.state = user.state;
                // $scope.zip = user.zip;
                // $scope.email = user.email;

            });

            $location.path("/profile");
        };



    }

})();

/**
 * Created by jtakwani on 2/19/16.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.hide = true;
        $scope.dispalert = false;


        $scope.update = function() {

            $scope.dispalert = false;
            //$rootScope.user = $scope.user;

            $rootScope.user.username = $scope.username;
            $rootScope.user.password = $scope.password;
            $rootScope.user.firstName = $scope.firstName;
            $rootScope.user.lastName = $scope.lastName;
            $rootScope.user.email = $scope.email;

            UserService.updateUser($rootScope.user.id, $rootScope.user,
                function(response) {
                    console.log(response);
                });

            $location.path("/home");
        };


    }



})();
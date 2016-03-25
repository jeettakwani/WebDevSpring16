/**
 * Created by jtakwani on 3/3/16.
 */
(function(){
    angular
        .module("GameRental")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope,$rootScope, $location) {
        $scope.location = $location;
        $scope.rootScope = $rootScope;

        $scope.logout = function(){
            "use strict";
            $rootScope.user = null;
            $location.path("/home");
        }

    }
})();
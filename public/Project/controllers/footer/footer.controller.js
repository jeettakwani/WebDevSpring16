/**
 * Created by jtakwani on 3/3/16.
 */
(function(){
    angular
        .module("GameRental")
        .controller("FooterController", FooterController);
    function FooterController($scope,$rootScope,$location)  {
        $scope.location = $location;
        $scope.rootScope = $rootScope;
    }
})();
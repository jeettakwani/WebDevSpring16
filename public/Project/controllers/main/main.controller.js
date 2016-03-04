/**
 * Created by jtakwani on 3/3/16.
 */
(function(){
    angular
        .module("GameRental")
        .controller("MainController", MainController);
    function MainController($scope, $location) {
        $scope.$location = $location;

    }
})();
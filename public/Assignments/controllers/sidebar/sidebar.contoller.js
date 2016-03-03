/**
 * Created by jtakwani on 2/19/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope,$rootScope,$location)  {
        $scope.location = $location;
        $scope.rootScope = $rootScope;
    }
})();
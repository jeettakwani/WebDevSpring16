/**
 * Created by jtakwani on 3/7/16.
 */

(function(){
    angular
        .module("GameRental")
        .controller("DetailController", detailController);

    function detailController($scope,$rootScope, $routeParams, GameService,$sce) {
        //var NewDetails;
        $scope.rootScope = $rootScope;
        $scope.gameId = $routeParams.id;

        GameService.findGameByID(
            $scope.gameId,
            function(response) {
                console.log(response);
                $scope.game = response;
                $scope.NewDetails=$sce.trustAsHtml($scope.game.results.description);
            }
        );

    }
})();
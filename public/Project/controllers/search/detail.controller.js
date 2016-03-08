/**
 * Created by jtakwani on 3/7/16.
 */

(function(){
    angular
        .module("GameRental")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, GameService) {
        $scope.gameId = $routeParams.id;

        GameService.findGameByID(
            $scope.gameId,
            function(response) {
                console.log(response);
                $scope.game = response;
            }
        )
    }
})();
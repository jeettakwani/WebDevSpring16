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
            $scope.gameId).then(
            function(response) {
                console.log(response);
                $scope.game = response.data;
                $scope.NewDetails=$sce.trustAsHtml($scope.game.results.description);
            }
        );

        $scope.addGame = function () {

            var platformsArray = [];

            for (var plat in $scope.game.results.platforms) {
                platformsArray.push($scope.game.results.platforms[plat].name);
            }

            var gameDetail = {tittle:$scope.game.results.name,
                year:$scope.game.results.original_release_date,price:'$',
                platforms:platformsArray, userId:$scope.rootScope.user._id};

            GameService.createGameForUser($scope.rootScope.user._id, gameDetail).then(
                function (response) {
                    $scope.gameName = "";
                    console.log(response);
                    GameService.findAllGamesForUser($scope.rootScope.user._id).then(function(response){
                        $scope.games = response.data;
                    });
                });

            $scope.$location.path("/mygames")

        };

    }
})();
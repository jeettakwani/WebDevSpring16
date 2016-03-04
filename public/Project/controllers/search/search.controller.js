/**
 * Created by jtakwani on 3/4/16.
 */
(function() {
    angular
        .module("GameRental")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, GameService) {
        $scope.search = search;
        $scope.gameName = $routeParams.gameName;


        if ($scope.gameName) {
            search($scope.gameName);
        }

        function search(gameName) {
            $location.url("/search/" + $scope.gameName);
            console.log(gameName);
            MovieService.findGameByTitle(
                gameName,
                function (response) {
                    console.log(response);
                    $scope.data = response;
                });
        }
    }

})();
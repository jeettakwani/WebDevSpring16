/**
 * Created by jtakwani on 3/4/16.
 */
(function() {
    angular
        .module("GameRental")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, GameService, UserService) {
        $scope.search = search;
        $scope.gameName = $routeParams.gameName;
        $scope.users = {};
        

        if ($scope.gameName) {
            search($scope.gameName);
        }

        function search(gameName) {
            console.log(gameName);
            GameService.findGameByTitle(gameName).then(function (response) {
                    console.log(response);
                    $scope.data = response.data;
                });
        }
        
        $scope.searchUsers = function() {
            var username = $scope.username;
            console.log(username);
            
            UserService.findUserByName(username). then(function (response) {
                console.log(response);
                $scope.users = response.data;
            });
        };

        $scope.follow = function (index) {
            $scope.selectedUserIndex = index;

            UserService.addFollower($scope.users[index],$scope.user._id).then(function(response) {
                //UserService.findAllGamesForUser($rootScope.user._id).then(function(response){
                  //  $scope.games = response.data;
                $location.path("/following");
            });
        };
    }

})();
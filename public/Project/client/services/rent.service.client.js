/**
 * Created by jtakwani on 4/17/16.
 */

(function() {
    angular
        .module("GameRental")
        .factory("RentService", rentService);

    function rentService($http) {

        var api = {
            ListGameByUser: ListGameByUser,
            updateGameListingById: updateGameListingById,
            deleteRentGameById:deleteRentGameById,
            findRentGamesByUser: findRentGamesByUser,
            findGameByID: findGameByID,
            findAllGamesByName: findAllGamesByName,
            rentGame: rentGame
        };
        return api;

        function ListGameByUser(id,game) {
            return $http.post('/api/project/user/'+ id + '/listGame', game);
        }

        function findRentGamesByUser(id) {
            return $http.get('/api/project/user/'+ id + '/myRentGames');
        }

        function findGameByID(id) {
            return $http.get('/api/project/user/rent/game/'+id);
        }

        function updateGameListingById(id,newGame) {
            return $http.put('/api/project/user/rent/updateGame/' + id, newGame);
        }

        function deleteRentGameById(id) {
            return $http.delete('/api/project/user/rent/delGame/' + id);
        }

        function findAllGamesByName(gameName) {
            return $http.get('/api/project/user/rent/searchGames?gameName=' + gameName);
        }

        function rentGame(game) {
            return $http.post('/api/project/user/rent/', game);
        }
    }
})();
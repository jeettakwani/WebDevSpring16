/**
 * Created by jtakwani on 3/4/16.
 */
(function(){
    angular
        .module("GameRental")
        .factory("GameService", gameService);

    function gameService($http) {

        var api = {
            findGameByTitle: findGameByTitle,
            findGameByID: findGameByID,
            createGameForUser: createGameForUSer,
            findAllGamesForUser: findAllGamesForUser,
            deleteGameById: deleteGameById,
            updateGameById: updateGameById
        };
        return api;

        function findGameByTitle(title) {
            return $http.get('/api/project/game?title='+title);
        }

        function findGameByID(id) {
            console.log(id);
            return $http.get('/api/project/game/'+id);
        }

        function createGameForUSer(userId, game) {
            return $http.post('/api/project/user/'+userId+'/game',game);
        }

        function findAllGamesForUser(userId) {
            return $http.get('/api/project/user/'+userId+'/game');
        }

        function deleteGameById(gameId) {
            return $http.delete('/api/project/game/'+gameId);
        }

        function updateGameById(gameId, newGame) {
            return $http.put('/api/project/game/'+gameId, newGame);
        }

    }
})();
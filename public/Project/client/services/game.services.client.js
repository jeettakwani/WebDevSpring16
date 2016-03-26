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
            return $http.jsonp('http://www.giantbomb.com/api/search/', {
                params: {
                    api_key: "33a4f5bd73d5408c13b6da96c011da9b2f635bb8",
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK',
                    resources: 'game',
                    limit: '20',
                    query: title
                }
            })
        }

        function findGameByID(id) {
            console.log(id);
            return $http.jsonp('http://www.giantbomb.com/api/game/'+id+'/', {
                params: {
                    api_key: "33a4f5bd73d5408c13b6da96c011da9b2f635bb8",
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK',
                    limit: '20'
                }
            });
        }

        function createGameForUSer(userId, game) {
            return $http.post('/api/project/user/'+userId+'/game',game);
        }

        function findAllGamesForUser(userId) {
            return $http.get('/api/project/user/'+userId+'/game');
        }

        function deleteGameById(id) {
            return $http.delete('/api/project/game/'+id);
        }

        function updateGameById(gameId, newGame) {
            return $http.put('/api/project/game/'+gameId, newGame);
        }

    }
})();
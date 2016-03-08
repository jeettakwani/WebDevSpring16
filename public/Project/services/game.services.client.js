/**
 * Created by jtakwani on 3/4/16.
 */
(function(){
    angular
        .module("GameRental")
        .factory("GameService", gameService);

    function gameService($http) {

        var baseUrl = "http://www.giantbomb.com/api";
        var apiKey = "33a4f5bd73d5408c13b6da96c011da9b2f635bb8";

        var games =
            [
                {"_id": "000", "title": "Fifa14", "userId": 123},
                {"_id": "010", "title": "Fifa15",  "userId": 123},
                {"_id": "020", "title": "Cricket12", "userId": 234},
                {"_id": "020", "title": "Cricket14", "userId": 234},
                {"_id": "020", "title": "Mortal Combat", "userId": 234},
                {"_id": "020", "title": "Street Fighter", "userId": 456}
            ];

        var api = {
            findGameByTitle: findGameByTitle,
            findGameByID: findGameByID,
            createGameForUser: createGameForUSer,
            findAllGamesForUser: findAllGamesForUser,
            deleteGameById: deleteGameById,
            updateGameById: updateGameById
        };
        return api;

        function findGameByTitle(title, callback) {
            $http.jsonp('http://www.giantbomb.com/api/search/', {
                params: {
                    api_key: apiKey,
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK',
                    resources: 'game',
                    limit: '20',
                    query: title
                }
            }).success(callback);
        }

        function findGameByID(id, callback) {
            console.log(id);
            $http.jsonp('http://www.giantbomb.com/api/game/'+id+'/', {
                params: {
                    api_key: apiKey,
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK',
                    limit: '20'
                }
            }).success(callback);
        }

        function createGameForUSer(userId, game, callback) {
            games.userId = userId;
            games.push(game);
            callback(games);
        }

        function findAllGamesForUser(userId, callback)
        {
            var userGame = [];
            for(user in games) {
                if(games[user].userId === userId)
                {
                    userGame.push(games[user]);
                }
            }
            callback(userGame);
        }

        function deleteGameById(gameId, callback)
        {
            for(game in games) {
                if(games[game]._id == gameId) {
                    games.splice(game);
                    break;
                }
            }
            callback(games);
        }

        function updateGameById(gameId, newGame, callback) {

            for(game in games) {
                if(games[game]._id == gameId)
                {
                    games[game] = newGame;
                    break;
                }

            }
            callback(game);
        }

    }
})();
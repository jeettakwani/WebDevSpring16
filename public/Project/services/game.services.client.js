/**
 * Created by jtakwani on 3/4/16.
 */
(function(){
    angular
        .module("GameRental")
        .factory("GameService", gameService);

    function gameService($http) {

        var baseUrl = "http://www.giantbomb.com/api";
        var apiKey = "33a4f5bd73d5408c13b6da96c011da9b2f635bb8"

        var api = {
            findGameByTitle: findGameByTitle,
            findGameByID: findGameByID
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

    }
})();
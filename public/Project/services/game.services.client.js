/**
 * Created by jtakwani on 3/4/16.
 */
(function(){
    angular
        .module("GameRental")
        .factory("GameService", gameService);

    function gameService($http) {

        var games = [
            {},
            {}
        ];

        var api = {
            findGameByTitle: findMovieByTitle,
            //findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function findGameByTitle(title, callback) {
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }

        function findMovieByImdbID(imdbID, callback) {
            $http.get("http://www.omdbapi.com/?i="+imdbID)
                .success(callback);
        }

    }
})();
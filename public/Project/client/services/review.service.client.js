
(function () {
    angular
        .module("GameRental")
        .factory("ReviewService", reviewService);

    function reviewService($http) {

        var api = {
            findAllReviewsForUser: findAllReviewsForUser,
            findAllReviewsForGame: findAllReviewsForGame,
            deleteReviewById:deleteReviewById,
            createReview:createReview,
            updateReview:updateReview
        };
        return api;

        function findAllReviewsForUser(userId){
           return $http.get('/api/project/'+userId+'/review');

        }

        function findAllReviewsForGame(gameId){
            return $http.get('/api/project/review/'+gameId);

        }

        function deleteReviewById(reviewId){
            return $http.delete('/api/project/review/'+reviewId);

        }

        function createReview(review){
            return $http.post('/api/project/review',review);

        }

        function updateReview(reviewId,review){
           return $http.put('/api/project/review/'+reviewId,review);

        }


    }
})();
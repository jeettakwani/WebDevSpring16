/**
 * Created by jtakwani on 4/18/16.
 */
(function () {
    "use strict";
    angular
        .module("GameRental")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($rootScope, $scope, ReviewService) {

        $scope.rootScope = $rootScope;
        //$scope.reviews = {};
        //$scope.review = {};

        if ($rootScope.user != null) {
            ReviewService.findAllReviewsForUser($scope.rootScope.user._id).then( function (response) {
                $rootScope.reviews = response.data;
                console.log($scope.reviews);
            });
        }



        $scope.editReview = function (index) {



            var updatedReview = {
                text: $scope.review.text,
                rating: $scope.review.rating
            }


            ReviewService.updateReview($scope.reviews[index]._id, updatedReview).then(function (response) {
                $scope.review = {};
                ReviewService.findAllReviewsForUser($scope.rootScope.user._id).then( function (response) {
                    $rootScope.reviews = response.data;
                    console.log($scope.reviews);
                });
            });
        };

        $scope.selectReview = function (index) {
            $rootScope.selectedReviewIndex = index;
            $scope.review = $scope.reviews[index];

        }


        $scope.deleteReview = function (index) {

            ReviewService.deleteReviewById($scope.reviews[index]._id).then( function (response) {
                ReviewService.findAllReviewsForUser($scope.rootScope.user._id).then( function (response) {
                    $scope.reviews = response.data;
                });
            });
        };

    }
})();
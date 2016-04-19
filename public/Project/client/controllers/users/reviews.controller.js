/**
 * Created by jtakwani on 4/18/16.
 */
(function () {
    "use strict";
    angular
        .module("GameRental")
        .controller("MyReviewsController", MyReviewsController);

    function MyReviewsController($rootScope, $scope, ReviewService) {

        $scope.rootScope = $rootScope;
        $scope.reviews = {};

        if ($rootScope.user != null) {
            ReviewService.findAllReviewsForUser($scope.rootScope.user._id).then( function (response) {
                $scope.reviews = response.data;
            });
        }



        $scope.editReview = function (index) {



            var updatedReview = {
                text: $scope.newReview.text,
                rating: $scope.newReview.rating
            }


            ReviewService.updateReview($scope.reviews[index]._id, updatedReview).then(function (response) {
                $scope.newReview = {};
                ReviewService.findAllReviewsForUser($scope.rootScope.user._id).then( function (response) {
                    $scope.reviews = response.data;
                });
            });
        };

        $scope.selectReview = function (index) {
            $scope.selectedReviewIndex = index;
            $scope.newReview = $scope.reviews[index];

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
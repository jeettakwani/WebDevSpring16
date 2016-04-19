/**
 * Created by jtakwani on 4/16/16.
 */

( function () {
    "use strict";
    angular
        .module("GameRental")
        .controller("FollowerController", FollowerController);

    function FollowerController($rootScope, $routeParams, $scope, $location, UserService, GameService,ReviewService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.following_firstname = $routeParams.following_firstname;
        $scope.games = {};
        $scope.flag = false;

        if($rootScope.user != null){
            UserService.findAllUsersForUser($scope.user._id).then(function(response){
                $scope.friends = response.data;

                for(var friend in $scope.friends) {
                    if ($scope.following_firstname == $scope.friends[friend].following_username) {
                        $scope.flag = true;
                    }
                }
            });
        }


        $scope.removeFriend = function (index) {
            $scope.selectedGameIndex = index;

            UserService.deleteFriendById($scope.friends[index].following).then(function(response) {
                UserService.findAllUsersForUser($rootScope.user._id).then(function(response){
                    $scope.friends = response.data;
                });
            });
        };


        UserService.findUserByUsername($scope.following_firstname).then(function(response){
            $scope.profile = response.data;
            GameService.findAllGamesForUser($scope.profile._id).then(function (response) {
                $scope.games = response.data;
                ReviewService.findAllReviewsForUser($scope.profile._id).then(
                    function (response) {
                        $scope.reviews = response.data;
                    }
                );
            });
        });

        $scope.follow = function (index) {
            $scope.selectedUserIndex = index;

            UserService.addFollower($scope.users[index],$scope.user._id).then(function(response) {
                //UserService.findAllGamesForUser($rootScope.user._id).then(function(response){
                //  $scope.games = response.data;
                $location.path("/following");
            });
        };

        $scope.removeFriendUsingProfile = function () {
            UserService.deleteFriendById($scope.profile._id).then(function(response) {
                UserService.findAllUsersForUser($rootScope.user._id).then(function(response){
                    $scope.friends = response.data;
                    $location.path("/following")
                });
            });
        };

        $scope.followFriendUsingProfile = function () {
            UserService.addFollower($scope.profile,$scope.user._id).then(function(response) {
                //UserService.findAllGamesForUser($rootScope.user._id).then(function(response){
                //  $scope.games = response.data;
                $location.path("/following");
            });
        };

    }
})();
/**
 * Created by jtakwani on 3/3/16.
 */
(function () {
    "use strict";
    angular
        .module("GameRental")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller : "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"

                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller : "RegisterController"

                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller : "HomeController"
                })
                .when("/pricing", {
                    templateUrl: "views/users/pricing.view.html",
                    controller : "RegisterController"
                })
                .when("/complete", {
                    templateUrl: "views/users/complete.view.html",
                    controller : "RegisterController"
                })
                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/searchResults/:gameName", {
                    templateUrl: "views/search/gameSearchResult.view.html",
                    controller: "SearchController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/detail/:id", {
                    templateUrl: "views/search/details.view.html",
                    controller: "DetailController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/help", {
                    templateUrl: "views/siteInfo/help.view.html"
                })
                .when("/about", {
                    templateUrl: "views/siteInfo/about.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/features", {
                    templateUrl: "views/siteInfo/features.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/mygames", {
                    templateUrl: "views/games/mygames.view.html",
                    controller: "GameController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/following", {
                    templateUrl: "views/users/following.view.html",
                    controller: "FollowerController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/friendProfile/:following_firstname", {
                    templateUrl: "views/users/friendProfile.view.html",
                    controller: "FollowerController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/friendReviews/:following_firstname", {
                    templateUrl: "views/users/friendReviews.view.html",
                    controller: "FollowerController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/searchUsers", {
                    templateUrl: "views/search/searchUsers.view.html",
                    controller: "SearchController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/canRent", {
                    templateUrl: "views/rent/canRent.view.html",
                    controller: "RentController"
                })
                .when("/addGamesForRentForms", {
                    templateUrl: "views/rent/addGamesForRentForms.view.html",
                    controller: "RentController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/addGamesForRentForms/:_id", {
                    templateUrl: "views/rent/addGamesForRentForms.view.html",
                    controller: "RentController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/gameRented", {
                    templateUrl: "views/rent/gamesRented.view.html",
                    controller: "RentController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/rentGames", {
                    templateUrl: "views/rent/rentGames.view.html",
                    controller: "RentController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/rentGames/:gameName", {
                    templateUrl: "views/rent/rentGames.view.html",
                    controller: "RentController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/basket/:id", {
                    templateUrl: "views/checkout/basket.view.html",
                    controller: "CheckoutController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/success", {
                    templateUrl: "views/checkout/success.view.html",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/reviews", {
                    templateUrl: "views/users/reviews.view.html",
                    controller: "ReviewsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log(user);
            if (user !== '0')
            {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();
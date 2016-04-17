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
                    controller : "ProfileController"

                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller : "FormController"

                })
                .when("/form-fields", {
                    templateUrl: "views/forms/form-fields.view.html",
                    controller : "FormController"

                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller : "RegisterController"

                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller : "LoginController"

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
                    controller: "SearchController"
                })
                .when("/detail/:id", {
                    templateUrl: "views/search/details.view.html",
                    controller: "DetailController"
                })
                .when("/help", {
                    templateUrl: "views/siteInfo/help.view.html"
                })
                .when("/about", {
                    templateUrl: "views/siteInfo/about.view.html"
                })
                .when("/features", {
                    templateUrl: "views/siteInfo/features.view.html"
                })
                .when("/mygames", {
                    templateUrl: "views/games/mygames.view.html",
                    controller: "GameController"
                })
                .when("/following", {
                    templateUrl: "views/users/following.view.html",
                    controller: "FollowerController"
                })
                .when("/searchUsers", {
                    templateUrl: "views/search/searchUsers.view.html",
                    controller: "SearchController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
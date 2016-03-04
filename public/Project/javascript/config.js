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
                    templateUrl: "index.html"
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
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
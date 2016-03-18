/**
 * Created by jtakwani on 2/19/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html"
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
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/fields.view.html",
                    controller : "FieldsController"

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
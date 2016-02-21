/**
 * Created by jtakwani on 2/19/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl:"index.html",
                })
                .when("/home", {
                    templateUrl: "views/home/home.html",

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.html",

                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.html",

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.html",

                })
                .when("/register", {
                    templateUrl: "views/users/register.html",
                    Controller: "RegisterController"

                })
                .when("/login", {
                    templateUrl: "views/users/login.html",

                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
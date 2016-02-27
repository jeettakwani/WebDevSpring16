/**
 * Created by jtakwani on 2/19/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl:"index.html"
                })
                .when("/home", {
                    templateUrl: "views/home/home.html"

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.html",
                    Controller: "ProfileController"

                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.html"

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.html",
                    Controller: "FormController"

                })
                .when("/register", {
                    templateUrl: "views/users/register.html",
                    Controller: "RegisterController"

                })
                .when("/login", {
                    templateUrl: "views/users/login.html",
                    Controller: "LoginController"

                })
                .when("/form-fields", {
                    templateUrl: "views/forms/form-fields.html",
                    Controller: "FormController"

                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
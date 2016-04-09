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
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller : "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller : "FormController",
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/fields.view.html",
                    controller : "FieldController",
                    resolve: {
                        loggedin: checkLoggedin
                    }

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

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log(user);
            if (user !== '0')
            {
                $rootScope.currentUser = user;
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

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();

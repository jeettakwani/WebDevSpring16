/**
 * Created by jtakwani on 2/19/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, $routeparams, UserService) {
        $rootScope.$location = $location;
        $rootScope.register = register;
    }

    function register() {
        user = {"_id" :(new Date).getTime(), "username":$rootScope.username,
            "password":$rootScope.password, "email":$rootScope.email};
        UserService.createUser(user,
        function(response) {
            console.log(response);
        });
    }
})();
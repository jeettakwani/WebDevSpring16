/**
 * Created by jtakwani on 2/19/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, $routeparams, UserService) {
        $rootScope.$location = $location;
        $rootScope.username = $routeparams.username;
        $rootScope.password = $routeparams.password;
        $rootScope.email = $routeparams.email;
        $rootScope.address = $routeparams.address;
        $rootScope.register = register;
    }

    function register(username,password,email,address) {
        user = {username:username, password:password, email:email, address:address};
        UserService.createUser(user,
        function(response) {
            console.log(response);
        });
    }
})();
/**
 * Created by jtakwani on 2/19/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, UserService) {
        $rootScope.$location = $location;
        $rootScope.update = update;
    }

    function update() {
        user = {username:username, password:password, email:email, address:address};
        UserService.createUser(user,
            function(response) {
                console.log(response);
            });
    }
})();
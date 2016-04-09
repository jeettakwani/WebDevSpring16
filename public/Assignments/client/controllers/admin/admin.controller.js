/**
 * Created by jtakwani on 2/19/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope,$location,UserService){

        $scope.reverse = false;
        $scope.predicate = 'username';
        $scope.selectedFormIndex = null;
        $scope.disable = true;
        $scope.newuser = {};


        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.selectUser = selectUser;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();


        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            console.log(error);
            $scope.error = error;
        }

        $scope.sort = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        function add(user){
            UserService.createUserAdmin(user)
                .then(function(response){

                    init();
                    $scope.newuser = {};

                }, function(err){
                    $scope.error = err;
                });

        }

        function remove(userId){
            UserService.deleteUserById(userId)
                .then(function(response){
                    init();
                }, function(err){
                    $scope.error = err;
                });

        }

        function update(user){

            UserService.updateUserforAdmin(user._id,user)
                .then(function(response){

                    $scope.newuser = {};
                    $scope.selectedUserIndex = null;
                    $scope.disable = true;
                    init();

                }, function(err){
                    $scope.error = err;
                });

        }

        function selectUser(user,index){
            $scope.selectedUserIndex = index;
            $scope.newuser = user;
            $scope.disable = false;
        }


    }
})();
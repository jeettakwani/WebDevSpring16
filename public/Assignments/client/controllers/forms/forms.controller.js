/**
 * Created by jtakwani on 2/19/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        $scope.$location = $location;
        $scope.rootScope = $rootScope;
        $scope.forms = {};

        if ($rootScope.user != null) {
            console.log(FormService);
            FormService.findAllFormsForUser($scope.rootScope.user._id).then(function (response) {
                $scope.forms = response.data;
            });
        }

        $scope.addForm = function () {

            var newForm = {
                recipe: $scope.formName,
                userId: $scope.rootScope.user._id
            };


            FormService.createFormForUser($scope.rootScope.user._id, newForm).then(
                function (response) {
                    $scope.formName = "";
                    console.log(response);
                    FormService.findAllFormsForUser($scope.rootScope.user._id).then(function (response) {
                        $scope.forms = response.data;
                    });
                });

        };

        $scope.updateForm = function () {

            var newForm = {

                _id: $scope.forms[$scope.selectedFormIndex]._id,
                recipe: $scope.formName,
                userId: $scope.rootScope.user._id


            };


            FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, newForm).then(function (response) {
                $scope.formName = "";
                FormService.findAllFormsForUser($scope.rootScope.user._id).then(function (response) {
                    $scope.forms = response.data;
                });
            });
        };


        $scope.selectForm = function (index) {
            $scope.selectedFormIndex = index;
            $scope.formName = $scope.forms[index].recipe;
        };

        $scope.deleteForm = function (index) {
            $scope.selectedFormIndex = index;

            FormService.deleteFormById($scope.forms[index]._id).then(function (response) {
                FormService.findAllFormsForUser($scope.rootScope.user._id).then(function (response) {
                    $scope.forms = response.data;
                });
            });
        };

    }
})();
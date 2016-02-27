/**
 * Created by jtakwani on 2/19/16.
 */

( function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        $scope.$location = $location;

        $scope.forms = FormService.findAllFormsForUser(123);

        $scope.addForm = function () {

            $scope.form = {};
            $scope.form._id = (new Date).getTime();
            $scope.form.title = $scope.title;
            $scope.form.userId = $scope._id;

            FormService.createFormForUser($scope._id, $scope.form,
            function(response) {
                console.log(response);
                $scope.forms = FormService.findAllFormsForUser(123);
            });

        };

        $scope.updateForm = function () {

            $scope.form[$scope.selectedFormIndex].title = $scope.title;

            FormService.updateFormById($scope.form._id, $scope.form)
        };

        $scope.selectForm = function(index) {
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                title: $scope.courses[index].title
            };
        };

        $scope.removeForm = function (form) {
            FormService.deleteFormById(form._id, function(response) {
                console.log(response);
            });
        };

    }
})();
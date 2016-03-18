/**
 * Created by jtakwani on 2/19/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $routeParams, $scope, $location, FieldService) {
        $scope.$location = $location;
        $scope.userId = $rootScope.user._id;
        $scope.formId = $routeParams.formId;

        FieldService.getFieldsForForm($scope.formId).then(
            function(response){
                $scope.fields = response.data;
            }
        );
        console.log($scope.fields);

        $scope.addField = function (fieldType) {

            var id = Math.floor((Math.random() * 500) + 1);
            var field = {};
            if(fieldType=="TEXT")
            {
                field =
                {"_id": id, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            }
            else if(fieldType=="DATE")
            {
                field = {"_id": id, "label": "New Date Field", "type": "DATE"};
            }
            else if(fieldType=="EMAIL")
            {
                field = {"_id": id, "label": "New Email Field", "type": "EMAIL"};
            }
            else if(fieldType=="TEXTAREA")
            {
                field = {"_id": id, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if(fieldType=="OPTIONS")
            {
                field = {"_id": id, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};

            }
            else if(fieldType=="CHECKBOXES")
            {
                field = {"_id": id, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]}
            }
            else if(fieldType=="RADIOS")
            {
                field = {"_id": id, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]}

            }


            FieldService.createFieldForForm($scope.formId, field).then(
                function (response) {
                    FieldService.getFieldsForForm($scope.formId).then(
                        function(response){
                            $scope.fields = response.data;
                        }
                    );
                }
            );

        };

        $scope.deleteField = function (index) {

            var field_id = $scope.fields[index]._id;
            console.log(FieldService.deleteFieldFromForm($scope.formId,field_id));
            FieldService.deleteFieldFromForm($scope.formId,field_id).then(function (response) {

                FieldService.getFieldsForForm($scope.formId).then(
                    function(response){
                        $scope.fields = response.data;
                    }
                );

            });
        };

    }
})();

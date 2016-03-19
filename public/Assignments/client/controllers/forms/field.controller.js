(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $routeParams, $scope, $location, FieldService, FormService) {
        $scope.$location = $location;
        $scope.userId = $rootScope.user._id;
        $scope.formId = $routeParams.formId;

        FieldService.getFieldsForForm($scope.formId).then(
            function (response) {
                $scope.fields = response.data;
            }
        );
        console.log($scope.fields);

        $scope.addField = function (fieldType) {


            var field = {};
            if (fieldType == "TEXT") {
                field =
                {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            }
            else if (fieldType == "DATE") {
                field = {"label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == "EMAIL") {
                field = {"label": "New Email Field", "type": "EMAIL"};
            }
            else if (fieldType == "TEXTAREA") {
                field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType == "OPTIONS") {
                field = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };

            }
            else if (fieldType == "CHECKBOXES") {
                field = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                }
            }
            else if (fieldType == "RADIOS") {
                field = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }

            }


            FieldService.createFieldForForm($scope.formId, field).then(
                function (response) {
                    FieldService.getFieldsForForm($scope.formId).then(
                        function (response) {
                            $scope.fields = response.data;
                        }
                    );
                }
            );

        };

        $scope.deleteField = function (index) {

            var field_id = $scope.fields[index]._id;
            console.log(FieldService.deleteFieldFromForm($scope.formId, field_id));
            FieldService.deleteFieldFromForm($scope.formId, field_id).then(function (response) {

                FieldService.getFieldsForForm($scope.formId).then(
                    function (response) {
                        $scope.fields = response.data;
                    }
                );

            });
        };

        $scope.toggleSelect = function (field) {
            $scope.editField = $scope.fields[field];
            $scope.editFieldIndex = field;
            $scope.formData = null;
        }


        $scope.updateField = function (index) {

            var _id = $scope.fields[index]._id;
            var label = $scope.formData.editlabel;
            var type = $scope.fields[index].type;
            var placeholder = null;
            var options = [];

            if (type == "TEXT") {
                placeholder = $scope.formData.textPlaceholder;
            }

            else if (type == "EMAIL") {
                placeholder = $scope.formData.emailPlaceholder;
            }
            else if (type == "TEXTAREA") {
                placeholder = $scope.formData.textareaPlaceholder;
            }
            else if (type == "OPTIONS") {

                var str = $scope.formData.dropdown;
                var opts = str.split("\n");

                for (var o in opts) {
                    var l = {};
                    l.label = opts[o].split(":")[0];
                    l.value = opts[o].split(":")[1];
                    options.push(l);
                }

            }
            else if (type == "CHECKBOXES") {

                var str = $scope.formData.checkboxes;
                var opts = str.split("\n");
                var l = {};
                for (var o in opts) {
                    l.label = opts[o].split(":")[0];
                    l.value = opts[o].split(":")[1];
                    options.push(l);
                }

            }
            else if (type == "RADIOS") {

                var str = $scope.formData.radios;
                var opts = str.split("\n");
                var l = {};
                for (var o in opts) {
                    l.label = opts[o].split(":")[0];
                    l.value = opts[o].split(":")[1];
                    options.push(l);
                }


            }

            var updatedField = {

                "_id": _id,
                "label": label,
                "type": type
            }
            if (placeholder) {
                updatedField.placeholder = placeholder;

            }
            else if (options.length != 0) {
                updatedField.options = options;
            }

            FieldService.updateField($scope.formId, _id, updatedField).then(
                function (response) {

                    FieldService.getFieldsForForm($scope.formId).then(
                        function (response) {
                            $scope.fields = response.data;
                        }
                    );

                }
            );

        }

        $scope.sortOrder = function (order) {
            console.log(order);
            $scope.fieldOrder = [];


            $scope.newform = {};


            for (var i in order) {
                for (var j in $scope.fields) {
                    if (order[i] == $scope.fields[j]._id) {
                        $scope.fieldOrder.push($scope.fields[j]);
                    }

                }
            }


            FormService.findFormById($scope.formId).then(
                function (response) {
                    console.log(response.data);
                    $scope.newform = response.data;
                    $scope.newform.fields = $scope.fieldOrder;

                    FormService.updateFormById($scope.formId, $scope.newform).then(
                        FieldService.getFieldsForForm($scope.formId).then(
                            function (response) {
                                $scope.fields = response.data;
                            }
                        )
                    );
                }
            );
        }

        $scope.cloneField = function (index) {

            var newField = $scope.fields[index];
            FieldService.createFieldForForm($scope.formId, newField).then(
                FieldService.getFieldsForForm($scope.formId).then(
                    function (response) {
                        $scope.fields = response.data;
                    }
                )
            );
        }
    }
})();

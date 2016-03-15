/**
 * Created by jtakwani on 2/20/16.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http) {

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,

        };

        return service;

        function createFormForUser(userId, form) {
            return $http.post('',form);
        }

        function findAllFormsForUser(userId) {
            return $http.get('');
        }

        function deleteFormById(formId) {
            return $http.delete();
        }

        function updateFormById(formId, newForm) {
            return $http.put('',newform);
        }




    }
})();
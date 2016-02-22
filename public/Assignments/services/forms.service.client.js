/**
 * Created by jtakwani on 2/21/16.
 */

/**
 * Created by jtakwani on 2/20/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms =
            [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ]

        function createFormForUser(userId, form, callback) {
            form.userId = userId;
            forms.push(form);
            callback(forms);
        }

        function findAllFormsForUser(userId, callback)
        {
            var userForms = [];
            for(user in forms) {
                if(forms[user].userId == userId)
                    userForms.push(forms[users]);
            }
            callback(forms);
        }

        function deleteFormById(formId, callback)
        {
            for(form in forms) {
                if(forms[form]._id == formId) {
                    forms.splice(form);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {


        }

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;


    }
})();
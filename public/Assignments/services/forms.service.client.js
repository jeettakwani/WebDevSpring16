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
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ]

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            return users;
        }

        function findAllFormsForUser(userId, callback)
        {
            for(user in users) {
                if(user.username == username && user.password == password)
                    return user;
            }
        }

        function deleteFormById(formId, callback)
        {
            users.add(user);
            return users;
        }

        function updateFormById(formId, newForm, callback) {


        }

    }
})();
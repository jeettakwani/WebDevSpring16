/**
 * Created by jtakwani on 3/15/16.
 */
/**
 * Created by jtakwani on 2/20/16.
 */

var forms = require("./form.mock.json");

module.exports = function () {

    var service = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle

    };

    return service;

    function createFormForUser(userId, form) {
        form.userId = userId;
        forms.push(form);
        return forms;
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for (var user in forms) {
            if (forms[user].userId == userId) {
                userForms.push(forms[user]);
            }
        }
        return userForms;
    }

    function findFormById(formId) {

        for (var f in forms) {
            if (forms[f]._id == formId) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormByTitle(title) {

        for (var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for (var form in forms) {
            if (forms[form]._id == formId) {
                forms.splice(form, 1);
                break;
            }
        }
        return forms;
    }

    function updateFormById(formId, newForm) {

        for (var form in forms) {
            if (forms[form]._id == formId) {
                forms[form] = newForm;
                break;
            }

        }
        return forms;
    }


}
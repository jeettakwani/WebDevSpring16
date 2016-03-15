/**
 * Created by jtakwani on 3/15/16.
 */
/**
 * Created by jtakwani on 2/20/16.
 */

var forms = require('./form.mock.json');

module.exports = function () {

    var form, f;

    var service = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,

    };

    return service;

    function createFormForUser(userId, form) {
        form.userId = userId;
        forms.push(form);
        return (forms);
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for (f in forms) {
            if (forms[f].userId === userId) {
                userForms.push(forms[f]);
            }
        }
        return (userForms);
    }

    function deleteFormById(formId) {
        for (form in forms) {
            if (forms[form]._id == formId) {
                forms.splice(form);
                break;
            }
        }
        return (forms);
    }

    function updateFormById(formId, newForm) {

        for (form in forms) {
            if (forms[form]._id == formId) {
                forms[form] = newForm;
                break;
            }

        }
        return (forms);
    }
};
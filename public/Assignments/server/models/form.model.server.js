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
        getFormById: getFormById,
        createFieldForForm: createFieldForForm,
        findFieldsForForm: findFieldsForForm,
        findFieldForForm: findFieldForForm,
        updateFields: updateFields,
        deleteFieldFromForm: deleteFieldFromForm
    };

    return service;

    function getFormById(id) {
        for (f in forms) {
            if (forms[f]._id === id) {
                return forms[f];
            }
        }
        return null;
    }

    function createFormForUser(userId, form) {
        form.userId = userId;
        forms.push(form);
        return (forms);
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for (f in forms) {
            if (forms[f].userId == userId) {
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

    function createFieldForForm(formId, field) {
        var form = getFormById(formId);
        form = form.fields.push[field];
        return form;
    }

    function findFieldsForForm(formId) {
        var form = getFormById(formId);
        return form.fields;
    }

    function findFieldForForm(formId, fieldId) {
        var form = getFormById(formId);
        var fields = form.fields;
        for(var field in fields) {
            if (fields[field]._id == fieldId) {
                return fields[field];
            }
        }
        return null;
    }

    function updateFields(formId, fieldId, newfield) {
        var form = getFormById(formId);
        var fields = form.fields;
        for(var field in fields) {
            if (fields[field]._id == fieldId) {
                fields[field] = newfield;
                break;
            }
        }
        return fields;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var form = getFormById(formId);
        var fields = form.fields;
        for(var field in fields) {
            if (fields[field]._id == fieldId) {
                fields.splice(field);
                break;
            }
        }
        return fields;
    }
};
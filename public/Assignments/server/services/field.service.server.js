/**
 * Created by jtakwani on 3/16/16.
 */

module.exports = function(app, model){

    app.post('/api/assignment/form/:formId/field',createFieldForForm);
    app.get('/api/assignment/form/:formId/field',getFieldsForForm);
    app.get('/api/assignment/form/:formId/field/:fieldId',getFieldForForm);
    app.put('/api/assignment/form/:formId/field/:fieldId',updateField);
    app.delete('/api/assignment/form/:formId/field/:fieldId',deleteFieldFromForm);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        field = model.createFieldForForm(formId, field);
        if(field) {
            res.send(200);
            return;
        }
        res.json({message:"field not created"});
    }

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = model.findFieldsForForm(formId);

        if(fields) {
            res.json(fields);
            return;
        }
        res.json({message:"fields not found"});
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        var form = model.findFieldForForm(formId, fieldId);
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "form not found"});
    }


    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body

        var form = model.updateFields(formId, fieldId, field);
        if(form) {
            res.send(200);
            return;
        }
        res.send(404);
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        if(model.deleteFieldFromForm(formId, fieldId)) {
            res.send(200);
            return;
        }
        res.json ({message: "Form not found"});
    }

};

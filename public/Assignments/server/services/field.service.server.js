/**
 * Created by jtakwani on 3/16/16.
 */

module.exports = function(app, model){

    app.post('/api/assignment/form/:formId/field',createFormField);
    app.get('/api/assignment/form/:formId/field',getFormField);
    app.get('/api/assignment/form/:formId/field/:fieldId',getFormById);
    app.put('/api/assignment/form/:formId/field/:fieldId',updateForm);
    app.delete('/api/assignment/form/:formId/field/:fieldId',deleteForm);

    function createFormField(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        form = model.createFormForUser(userId, form);
        if(form) {
            res.send(200);
            return;
        }
        res.json({message:"form not created"});
    }

    function getFormField(req, res) {
        var formId = req.params.formId;
        var fields = model.findAllFormsForUser(userId);

        if(fields) {
            res.json(fields);
            return;
        }
        res.json({message:"fields not found"});
    }
    function getFormById(req, res) {
        var id = req.params.formId;
        var form = model.getFormById(id);
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "form not found"});
    }


    function updateForm(req, res) {
        var id = req.params.formId;
        var form = req.body;

        var form = model.updateFormById(form);
        if(form) {
            res.send(200);
            return;
        }
        res.send(404);
    }

    function deleteForm(req, res) {
        var id = req.params.formId;

        if(model.deleteFormById(id)) {
            res.send(200);
            return;
        }
        res.json ({message: "Form not found"});
    }

};

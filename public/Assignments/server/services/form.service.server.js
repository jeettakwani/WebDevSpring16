/**
 * Created by jtakwani on 3/16/16.
 */

module.exports = function(app, model){

    app.post('/api/assignment/user/:userId/form',createFormForUser);
    app.get('/api/assignment/user/:userId/form',getFormForUser);
    app.get('/api/assignment/form/:formId',getFormById);
    app.put('/api/assignment/form/:formId',updateForm);
    app.delete('/api/assignment/form/:formId',deleteForm);

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form = model.createFormForUser(userId, form);
        if(form) {
            res.send(200);
            return;
        }
        res.json({message:"form not created"});
    }

    function getFormForUser(req, res) {
        var userId = req.params.userId;
        var forms = model.findAllFormsForUser(userId);

        if(forms) {
            res.json(forms);
            return;
        }
        res.json({message:"form not found"});
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

module.exports = function(app,model){
    "use strict";

    var uuid = require('node-uuid');
    app.get('/api/assignment/user/:userId/form',getAllForms);
    app.get('/api/assignment/form/:formId',getFormById);
    app.delete('/api/assignment/form/:formId',deleteForm);
    app.post('/api/assignment/user/:userId/form',createForm);
    app.post('/api/assignment/form/:title',getFormByTitle);
    app.put('/api/assignment/form/:formId',updateForm);


    function getAllForms(req,res){
        var userId = req.params.userId;
        var forms = model.findAllFormsForUser(userId);
        res.json(forms);
    }

    function getFormById(req,res){
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function deleteForm(req,res){
        var formId = req.params.formId;
        if(model.deleteFormById(formId)){
            res.send(200);
            return;
        }
        res.json({message: "Form not found"});
    }

    function createForm(req,res){

        var form = req.body;
        var id =  uuid.v4();
        form._id = id;
        form.fields = [];
        var userId = req.params.userId;
        if (model.createFormForUser(userId,form)) {
            res.send(200);
            return;
        }
        res.json({message: "Form not created"});
    }

    function updateForm(req,res){
        var newForm = req.body;
        var formId = req.params.formId;
        if (model.updateFormById(formId,newForm)) {
            res.send(200);
            return;
        }
        res.send(404);
    }

    function getFormByTitle(req,res){
        var title = req.params.title;
        var form = model.findFormByTitle(title);
        res.json(form);
    }

}
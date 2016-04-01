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
        var forms = model.findAllFormsForUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormById(req,res){
        var formId = req.params.formId;
        var form = model.findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteForm(req,res){
        var formId = req.params.formId;
        var deletedForm = model.deleteFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createForm(req,res){

        var form = req.body;
        var id =  uuid.v4();
        form._id = id;
        form.fields = [];
        var userId = req.params.userId;
        var createdForm = model.createFormForUser(userId,form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req,res){
        var newForm = req.body;
        var formId = req.params.formId;
        var updatedForm = model.updateFormById(formId,newForm)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormByTitle(req,res){
        var title = req.params.title;
        var form = model.findFormByTitle(title)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};
module.exports = function(app,model){
    "use strict";

    var uuid = require('node-uuid');
    app.get('/api/assignment/form/:formId/field',getAllFields);
    app.get('/api/assignment/form/:formId/field/:fieldId',getFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId',deleteField);
    app.post('/api/assignment/form/:formId/field',createField);
    app.put('/api/assignment/form/:formId/field/:fieldId',updateField);


    function getAllFields(req,res){
        var formId = req.params.formId;
        var field = model.findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc.fields)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        var field = model.findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteField(req,res){

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        model.deleteField(fieldId,formId)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createField(req,res) {
        var formId = req.params.formId;
        var field = req.body;

        var id =  uuid.v4();
        field._id = id;

        var form = model.findFormById(formId)
            .then(
                function (doc) {
                    res.json(field)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateField(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        model.updateField(fieldId,formId,newField)
            .then(
                function (doc) {
                    res.json(field)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


};

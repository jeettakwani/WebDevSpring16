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
        var form = model.findFormById(formId);
        res.json(form.fields);
    }

    function getFieldById(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        var form = model.findFormById(formId);

        for (var field in form.fields) {
            if (form.fields[field]._id == fieldId)
                res.json(form.fields[field])
        }
    }

    function deleteField(req,res){

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        var form = model.findFormById(formId);

        for (var field in form.fields) {
            if (form.fields[field]._id == fieldId)
                form.fields.splice(field,1)
        }

        if(model.updateFormById(formId,form)){
            res.send(200);
            return;
        }
        res.send(404);
    }

    function createField(req,res){
        var formId = req.params.formId;
        var field = req.body;

        var id =  uuid.v4();
        field._id = id;

        var form = model.findFormById(formId);


        console.log(form.fields);
        form.fields.push(field);
        if(model.updateFormById(formId,form)){
            res.send(200);
            return;
        }

        res.json({message: "Field not created"});
    }

    function updateField(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        var form = model.findFormById(formId);

        for (var field in form.fields) {
            if (form.fields[field]._id == fieldId)
                form.fields[field] = newField;
        }

        if (model.updateFormById(formId,form)) {
            res.send(200);
            return;
        }
        res.send(404);
    }


}

/**
 * Created by jtakwani on 4/1/16.
 */
var uuid = require('node-uuid');

var q = require("q");

module.exports = function(mongoose) {
    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create form model from schema
    var FormModel = mongoose.model('FormForFields',FormSchema);
    
    var api = {
        findAllFields: findAllFields,
        findFieldById: findFieldById,
        createField: createField,
        deleteField: deleteField,
        updateField: updateField,
        fieldsAsPerType: fieldsAsPerType,
        updateFieldAsPerType: updateFieldAsPerType
    };
    
    return api;

    function findAllFields(formId) {
        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,doc)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFieldById(fieldId, formId) {
        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<form.fields.length;i++)
                {
                    if(fieldId == form.fields[i]._id)
                    {
                        deferred.resolve(form.fields[i]);
                        break;
                    }
                }

            }
        });

        return deferred.promise;
    }
    
    function createField(formId,newField) {
        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                var fieldsList = form.fields;
                var upNewField = fieldsAsPerType(newField);
                fieldsList.push(upNewField);
                form.fields = fieldsList;

                form.save(function(err,doc)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        //console.log(deferred)
        return deferred.promise;
    }

    function fieldsAsPerType(field) {
        var upNewField = "";
        if(field.type == "TEXT" || field.type == "TEXTAREA")
        {
            upNewField =
            {
                //"_id": formId,
                "label": field.label, "type": field.type, "placeholder" : field.placeholder
            };

        }
        else if(field.type == "DATE")
        {
            upNewField =
            {
                //"_id": formId,
                "label": field.label, "type": field.type
            };
        }
        else if(field.type == "OPTIONS" || field.type == "CHECKBOXES" || field.type == "RADIOS")
        {
            upNewField =
            {
                //"_id": formId,
                "label": field.label, "type": field.type, "options" : field.options
            };
        }

        return upNewField;
    }

    function deleteField(fieldId, formId) {
        var deferred = q.defer();

        FormModel.findById({_id : formId}, function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<form.fields.length;i++)
                {
                    if(fieldId == form.fields[i]._id)
                    {
                        form.fields.splice(i,1);
                        break;
                    }
                }

                form.save(function(err,doc)
                {
                    if(err)
                        deferred.reject(err);
                    else
                    {
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateField(fieldId, formId,newField) {
        var deferred = q.defer();

        FormModel.findById({_id : formId}, function(err,form)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                for(var i=0;i<form.fields.length;i++)
                {
                    if(fieldId == form.fields[i]._id)
                    {
                        updateFieldAsPerType(form.fields[i],newField);
                        break;
                    }
                }

                console.log(form);

                form.save(function(err,doc)
                {
                    if(err)
                    {
                        console.log(err);
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateFieldAsPerType(field,newField)
    {
        if(newField.type == "TEXT" || newField.type == "TEXTAREA")
        {
            field.label = newField.label;
            field.placeholder = newField.placeholder;
        }
        else if(upField.type == "DATE")
        {
            field.label = newField.label;
        }
        else
        {
            var optionsList = [];

            var options = newField.options;
            var optionsParts = options.split("\n");

            for(var i=0;i<optionsParts.length;i++)
            {
                var opObject = new Object();

                var parts = optionsParts[i].split(":");

                opObject.label = parts[0];
                opObject.value = parts[1];
                optionsList.push(opObject);
            }

            //console.log(optionsList);

            field.label = newField.label;
            field.options = optionsList;
        }
    }
};
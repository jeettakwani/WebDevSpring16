/**
 * Created by jtakwani on 3/15/16.
 */
/**
 * Created by jtakwani on 2/20/16.
 */

var forms = require("./form.mock.json");

var q = require('q');

module.exports = function (db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create form model from schema
    var FormModel = mongoose.model('Form',FormSchema);

    var service = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle

    };

    return service;

    function createFormForUser(userId, form) {
        var deferred = q.defer();

        form.userId = userId;
        form.fields = [];
        FormModel.create(form,function(err,doc)
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

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        FormModel.find({userId : userId},function(err,doc){
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

    function findFormById(formId) {

        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,doc)
        {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function findFormByTitle(title) {

        for (var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        FormModel.remove({_id : formId},function(err,doc)
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

    function updateFormById(formId, newForm) {

        var deferred = q.defer();

        FormModel.findById({_id : formId},function(err,upForm)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                upForm.title = newForm.title;
                upForm.save(function(err,doc)
                {
                    deferred.resolve(doc);
                });
            }
        });

        return deferred.promise;
    }
};
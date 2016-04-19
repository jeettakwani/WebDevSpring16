/**
 * Created by jtakwani on 4/18/16.
 */
var q = require("q");

module.exports = function (db,mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ReviewModel = mongoose.model('Review', ReviewSchema);


    var api = {
        createReview: createReview,
        findAllReviewsForUser: findAllReviewsForUser,
        findAllReviewsForGame:findAllReviewsForGame,
        deleteReviewById: deleteReviewById,
        updateReviewById: updateReviewById
    };

    return api;

    function createReview(review) {
        var deferred = q.defer();


        ReviewModel.create(review, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllReviewsForUser(userId) {
        var deferred = q.defer();

        ReviewModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findAllReviewsForGame(gameId) {
        var deferred = q.defer();

        ReviewModel.find({gameId: gameId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function deleteReviewById(review_Id) {

        var deferred = q.defer();

        ReviewModel.remove({_id: review_Id}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateReviewById(review_Id, newReview) {
        var deferred = q.defer();

        ReviewModel.update({_id: review_Id}, {$set: newReview}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}
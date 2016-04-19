module.exports = function(app,model) {
    "use strict";


    app.get('/api/project/:userId/review', findAllReviewsForUser);
    app.get('/api/project/review/:gameId', findAllReviewsForGame);
    app.delete('/api/project/review/:reviewId', deleteReviewById);
    app.post('/api/project/review', createReview);
    app.put('/api/project/review/:reviewId', updateReview);


    function findAllReviewsForUser(req,res){
        var userId = req.params.userId;
        model.findAllReviewsForUser(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllReviewsForGame(req,res){
        var gameId = req.params.gameId;
        model.findAllReviewsForGame(gameId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteReviewById(req,res){
        var reviewId = req.params.reviewId;
        model.deleteReviewById(reviewId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createReview(req,res){
        var review = req.body;
        model.createReview(review).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateReview(req,res){
        var reviewId = req.params.reviewId;
        var newReview = req.body;
        model.updateReviewById(reviewId,newReview).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }
}
/**
 * Created by karina on 02/05/17.
 */
"use strict";
app.controller('reviewController', ["$scope", "reviewFactory", "relevantCook", "$http", 'authFactory', function ($scope, reviewFactory, relevantCook, $http, authFactory) {


    $scope.cook = relevantCook;
    console.log(relevantCook);

    $scope.addReview = function (review) {
        let newReview = {
            text: review.text,
            author: $scope.currentUser,
            cooksid: $scope.cook._id,
        };

        reviewFactory.addReview(newReview)
            .then(function (review) {
                $scope.cook.reviews.push(review);
            }, function (err) {
                console.error(err);
            });

    };

    $scope.deleteReview = function (review) {
        console.log("soy el review to Remove" + " "+  review);
        return $http.delete('/deleteReview/' + review._id + '/deleteReviewId', review)
            .then(function (response) {
                console.log("from the controller delete");
                console.log(response);
                $http.get('/account/deleteReview').then(function (reviews) {
                    $scope.cook.reviews = reviews.data;///now we are reshowing the data after the db removed it
                });
            })

    };
    // $scope.upvote = function (review) {
    //     reviewFactory.upvote(review).then(function () {
    //         reviewFactory.getReview().then(function (reviews) {
    //             $scope.reviews = reviews;
    //             console.log("i like it")
    //         });
    //     });
    // };
    //
    // $scope.downvote = function (review) {
    //     reviewFactory.downvote(review).then(function () {
    //         reviewFactory.getReview().then(function (review) {
    //             $scope.reviews = review;
    //             console.log("i dislike it")
    //         });
    //     });
    // };



}]);

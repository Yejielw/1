/**
 * Created by karina on 02/05/17.
 */
"use strict";
app.controller('reviewController', ["$scope", "reviewFactory", "relevantCook", "$http", 'authFactory', function ($scope, reviewFactory, relevantCook, $http, authFactory) {


    $scope.cook = relevantCook;
    // console.log(relevantCook);

    $scope.addReview = function (review) {
        let newReview = {
            text: review.text,
            author: $scope.currentUser
        };
        reviewFactory.addReview(newReview, $scope.cook._id)
            .then(function (reviews) {

                $scope.cook.reviews = reviews
            }, function (err) {
                console.error(err);
            });
    };

    $scope.upvote = function (user) {
        reviewFactory.upvote(user).then(function () {
            $scope.cook.upvotes++;
            console.log("i like it")
        });

    };

    $scope.downvote = function (user) {
        reviewFactory.downvote(user).then(function () {
            $scope.cook.downvotes++;
            console.log("i like it")
        });

    };

    $scope.deleteReview = function (reviewId) {
        var self = this;//this is the scope of a single review as defined by ng-repeat
        reviewFactory.deleteReview(reviewId, $scope.cook._id)
            .then(function (response) {
                console.log(response);
                $scope.cook.reviews.splice(self.$index, 1)
            }, function (err) {
                console.error(err);
            });
    }


        // $scope.myInterval = 3000;
        // $scope.noWrapSlides = false;
        // $scope.activeSlide = 0;

    // $scope.counter = 0;
    // $scope.counterPlace = 0;
    // $scope.nextPhoto = function() {
    //     // $scope.animateClass =  $scope.animateClass === 'slideInRight' ? 'slideInLeft' : 'slideInRight';
    //     //setTimeout($scope.animateClassFunc(), 1000);
    //     $scope.counter += 1;
    //     console.log($scope.animateClass);
    //     console.log($scope.counter);
    // }
    //
    // $scope.lastPhoto = function() {
    //     if ($scope.counter > 0) {
    //         $scope.counter -= 1;
    //         //$scope.animateClass =  'slideInLeft';
    //         setTimeout($scope.animateClassFunc(), 2000);
    //     }
    // }
    //
    // $scope.nextPlace = function() {
    //     // $scope.animateClass =  '';
    //     $scope.counterPlace += 1;
    //     console.log($scope.animateClass);
    //     setTimeout($scope.animateClassFunc(), 2000);
    //     console.log($scope.animateClass);
    // }
    //
    // $scope.lastPlace = function() {
    //     if ($scope.counterPlace > 0) {
    //         $scope.counterPlace -= 1;
    //         // $scope.animateClass =  'slideInLeft';
    //         setTimeout($scope.animateClassFunc(), 2000);
    //     }
    // }

    $scope.animateClassFunc = function() {
        $scope.animateClass = ' ';
        console.log('setTimeout class')
    };





}]);

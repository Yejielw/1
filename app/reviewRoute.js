/**
 * Created by karina on 02/05/17.
 */
"use strict";
const express = require('express');
const router = express.Router();
const Review = require('../app/reviewModel'); // Esto es para acceder al schema que estamos exportando como un objeto
const User = require('../app/model');

const ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {}
};


router.get('/:userid', function(req, res, next) {
    console.log("********************* userId*********************");

    const userId = req.params.userid;

    console.log("Looking for user with id ", userId);
    User.findOne({ _id: userId }).populate("reviews")
        .exec(function(error, user) {
            console.log(user);
            if (error) {
                console.error("Error finding user with id ", userId, ":", error);
                return next(error);
            } else if (!user) {
                console.log("No  exists user with id ", userId);
                res.send({});
            } else {
                console.log("********************* review*********************");
                console.log("Found user with id ", userId, ":", user);
                res.send(user);
            }

        });

});

// router.put('/:revieswid/upvote', function (req, res) {
//     req.review.upvote();
//     req.review.save(function (err, review) {
//         res.send(review);
//     });
// });
//
// router.put('/:reviewsid/downvote',  function (req, res) {
//     req.review.downvote();
//     req.review.save(function (err, review) {
//         res.send(review);
//     });
// });

module.exports = router;
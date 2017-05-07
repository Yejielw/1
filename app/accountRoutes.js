var express = require('express');
var router = express.Router();
var User = require("../app/model");
var Review = require("../app/reviewModel");
var passport = require('passport');

// ******** WORK IN PROGRESS **********

router.get('/updateProfile', (req, res, next) => {
    return res.send(req.user);
});

router.post('/updateProfile', (req, res, next) => {


    //const errors = req.validationErrors();


    User.findById(req.user._id, (err, user) => {
        // http://localhost:3000/users/currentUser
        console.log(req.user.id);
        if (err) {
            return next(err);
        }

        user.email = req.body.email || '';
        user.username = req.body.username || '';
        user.fullname = req.body.fullname || '';
        user.cookPic = req.body.image || '';
        user.descrip = req.body.descrip || '';
        user.phoneNumber = req.body.phoneNumber || '';
        user.place = req.body.place || '';
        // user.cook = x || '';

        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    // req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    return res.redirect('/myAccount');
                }
                return next(err);
            }
            //req.flash('success', { msg: 'Profile information has been updated.' });
            res.redirect('/myAccount');
        });
    });
});

// Add Product

router.post('/addfood', (req, res, next) => {

    var Food = {
        dish: req.body.dish,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type,
        img: req.body.img,
        options: req.body.options,
        availability: req.body.availability
    };

    //const errors = req.validationErrors();


    User.findById(req.user._id, (err, user) => {
        // console.log(req.user.id)
        if (err) {
            return next(err);
        }
        if (req.user.cook) {
            user.foods.push(Food)

            user.save((err) => {
                if (err) {
                    if (err.code === 11000) {
                        // req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                        return res.redirect('/home');
                    }
                    return next(err);
                }
                //req.flash('success', { msg: 'Profile information has been updated.' });
                res.redirect('/home');
            });
        }
        else {
            console.log("not a cook");
        }
    });
});
router.post('/addReview', (req, res, next) => {

    let newReview = new Review(req.body);

    const cooksid = req.body.cooksid;
    // console.log("**************************");
    // console.log(req.body.cooksid);
    //const errors = req.validationErrors();

    User.findById(cooksid)
        .then(function (user) {
            newReview.save()
                .then(function (review) {
                    user.reviews.push(review);
                    user.save().then(function (saveduser) {

                        user.populate("reviews", function (err, user) {
                            // console.log(user);
                            res.send(user.reviews)

                        })


                    })
                })

        })
        .catch(console.log);
});

router.delete('/:userid/reviews/:deleteReviewId', function (req, res, next) {

    const userId = req.params.userid;
    User.findById(userId, function (err, foundUser) {
        if (err) {
            return next(err);
        } else if (!foundUser) {
            return res.send("Error! No User found with this ID");
        } else {
            let reviewToRemove = foundUser.reviews.id(req.params.deleteReviewId);
            if (reviewToRemove) {
                reviewToRemove.remove(function (err, result) {
                    if (err) {
                        return next(err);
                    } else {
                        return res.send(result);
                    }
                });

            }
        }

    })

});

module.exports = router;
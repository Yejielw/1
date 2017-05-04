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
        console.log(req.user.id)
        if (err) { return next(err); }

        user.email = req.body.email || '';
        user.username = req.body.username || '';
        user.fullname = req.body.fullname || '';
        // user.profile.username = req.body.username || '';
        // user.profile.location = req.body.location || '';
        // user.profile.phoneNumber = req.body.phoneNumber || '';
        // user.profile.image = req.body.image || '';
        // user.cook = x || '';

        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    // req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    return res.redirect('/account');
                }
                return next(err);
            }
            //req.flash('success', { msg: 'Profile information has been updated.' });
            res.redirect('/account');
        });
    });
});
router.post('/addReview', (req, res, next) => {

    let newReview = new Review(Object.assign({author: 'someone'}, req.body.text));

    let cooksid = req.body._id;
    //const errors = req.validationErrors();

    console.log('********* route ********');
    console.log(req.body);
    console.log('********* route 2********');
    console.log(req.user.id);
    User.findById(cooksid, (err, user) => {

        if (err) { return next(err); }
        console.log('********* route 3********');
        console.log(user)
        user.reviews.push(newReview)

        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    // req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    return res.redirect('/profile');
                }
                return next(err);
            }
            //req.flash('success', { msg: 'Profile information has been updated.' });
            res.redirect('/profile');
        });
    });
});
module.exports = router;
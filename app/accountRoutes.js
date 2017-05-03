var express = require('express');
var router = express.Router();
var User = require("../app/model");
var passport = require('passport');

// ******** WORK IN PROGRESS **********//

router.get('/updateProfile', passport.authenticate('local'), (req, res, next) => {
    res.send('algo paso');
    next();
});
router.post('/updateProfile', passport.authenticate('local'), (req, res, next) => {

    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        //return res.redirect('/account');
    }

    User.findById(req.user.id, (err, user) => {
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
                    req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    return res.redirect('/account');
                }
                return next(err);
            }
            req.flash('success', { msg: 'Profile information has been updated.' });
            res.redirect('/account');
        });
    });
});
module.exports = router;
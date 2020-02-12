const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
// load profile model
const Profile = require('../../models/Profile');
// load user model
const User = require('../../models/User');

const validateProfileInput = require('../../validator/profile');
const validateExperienceInput = require('../../validator/experience');
const router = express.Router();


/**
 * @route api/profile/test
 * @desc test
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: 'server worked'
    })
});

/**
 * @route api/profile
 * @description
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        // COOOL THING
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = 'There is no profile for this user';
                res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch((errO) => {
            res.status(400).json(errO);
        });
});
/**
 * @route api/profile/user/:user_id
 * @description get profile 
 * @access public
 */
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile
        .findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = 'There is no profile';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((error) => {
            res.status(400).json(JSON.stringify(error));
        });
});

/**
 * @route api/profile/all
 * @description get all profile 
 * @access public
 */
router.get('/all', (req, res) => {
    const errors = {};
    Profile
        .findOne({})
        .populate('user', ['name', 'avatar'])
        .then((profiles) => {
            if (!profiles) {
                errors.noProfile = 'There is no profile';
                res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch((error) => {
            res.status(400).json(JSON.stringify(error));
        });
});
/**
 * @route api/profile/experience
 * @description create experience 
 * @access private
 */
router.post('/exprience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
        res.status(400).json(errors).end();
    }
    Profile
        .findOne({ user: req.user.id })
        .then((profile) => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                current: req.body.current,
                description: req.body.description,
                from: req.body.from,
                to: req.body.to
            };
            profile.experience.unshift(newExp);
            Profile.save().then((profile) => {
                res.json(profile);
            })
        })
});

/**
 * @route api/profile/handle/:handle
 * @description get profile 
 * @access public
 */
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile
        .findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = 'There is no profile';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

/**
 * @route api/profile
 * @description create profile
 * @access private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // validate profile input
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skill split into an array
    if (typeof req.body.skills != null) profileFields.skills = req.body.skills.split(',');
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    // req.user get from middleware passport
    Profile.findOne({ user: req.user.id })
        .then((profile) => {
            if (profile) {
                // UPDATE
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => {
                        res.json(profile);
                    })
            }
            // CREATE
            Profile.findOne({ handle: profileFields.handle }).then((profile) => {
                if (profile) {
                    errors.handle = 'That handle already exist';
                    res.status(400).json(errors)
                }
                new Profile(profileFields).save().then((profile) => {
                    res.json(profile);
                })
            })
        })
});

module.exports = router;
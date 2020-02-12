const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('../../config/key');
const JWT = require('jsonwebtoken');
const gravatar = require('gravatar');
const passport = require('passport');
const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');
/**
 * @route api/users/test
 * @desc test
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: 'server worked'
    })
});

/**
 * @route api/users/register
 * @desc register a user 
 * @access public
 */
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        res.status(400).json(errors).end();
    }
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(400).json('User already exist').end();
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rate
                    d: 'mm' // default 
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (error, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => res.json(user))
                            .catch((err) => console.log(err));
                    })
                })
            }
        })
});


/**
 * @route api/users/login
 * @desc login and return JWT 
 * @access public
 */
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            res.status(404).json('User not found');
        }

        // check password
        bcrypt.compare(password, user.password).then(onFullFilled => {
            if (!onFullFilled) {
                res.status(404).json('Password not correct').end();
            }

            // create JWT payload
            const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            };
            // sign key  
            JWT.sign(
                payload,
                keys.keys,
                { expiresIn: 3600 },
                (err, encoded) => {
                    res.json({
                        token: `Bearer ${encoded}`
                    });
                });
        });
    });
});

/**
 * @route api/users/current
 * @desc return current user
 * @access public
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        email: req.user.email
    });
});

module.exports = router;
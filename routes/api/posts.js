const express = require('express');
const passport = require('passport');
const Post = require('../../models/Post');
const router = express.Router();
const validatePostInput = require('../../validator/post.js')
/**
 * @route api/posts/test
 * @desc test
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: 'server worked'
    })
});

/**
 * @route api/posts/
 * @desc test
 * @access public
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { isValid, errors } = validatePostInput(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user.id,
    });
    newPost.save().then(post => {
        res.json(post);
    })
});

/**
 * @route api/posts/
 * @desc test
 * @access public
 */
router.get('/', (req, res) => {
    Post.find({})
        .sort({ date: -1 })
        .then((posts) => {
            res.json(posts);
        })
        .catch((error) => {
            res.status(404).json(error);
        });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .sort({ date: -1 })
        .then((post) => {
            res.json(post);
        })
        .catch((error) => {
            res.status(404).json(error);
        });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            console.log('day la user from delete');
            console.log(req.user);
            console.log(req.user.id);
            console.log(req.user._id);
            if (post.user && post.user.toString() !== req.user.id) {
                res.status(401).json('Unauthorised');
            }
            post.remove().then(() => {
                res.json('success');
            })
        })
        .catch((error) => {
            res.status(404).json(error);
        });
});

router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('-----', req.params.post_id);
    Post.findById(req.params.post_id)
        .then((post) => {
            console.log('vvv');
            console.log(post);
            if (post.user && post.user.toString() !== req.user.id) {
                res.status(401).json('Unauthorised');
            }
            console.log('rererer');
            let userIndex = -1;
            if (post.likes.length > 0) {
                userIndex = post.likes.findIndex(like => like.user.toString() === req.user.id);
            }
            console.log('nn');
            if (userIndex === -1) {
                // save new like
                post.likes.unshift({ user: req.user.id });
                post
                    .save()
                    .then((post) => res.json(post))
                    .catch(error => res.status(400).json(error));
            } else {
                // unlike
                console.log('nnnn');
                post.likes = post.likes.filter((like) =>
                    like.user.toString() !== req.user._id.toString());
                post
                    .save()
                    .then((post) => res.json(post))
                    .catch(error => res.status(400).json(error));
            }
        })
        .catch((error) => {
            res.status(404).json(error);
        });
});

router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
            if (!post) {
                res.status(404).json('Not found');
            }
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.body.user,

            };
            post.comment.unshift(newComment);
            post
                .save()
                .then((post) => {
                    res.json(post);
                }).catch((error) => {
                    res.status(400).json(error);
                })
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
            if (!post) {
                res.status(404).json('Not found');
            }
            const cmtDeleted = post.comment.find((cmt) => cmt._id === req.params.comment_id);
            if (cmtDeleted && cmtDeleted.user === req.user.id) {
                post.comment = post.comment.filter((cmt) => cmt._id.toString() !== req.params.comment_id);
                post
                    .save()
                    .then((post) => {
                        res.json(post);
                    }).catch((error) => {
                        res.status(400).json(error);
                    });
            } else {
                // the comment id is not in comment or user authenticated not own the comment
                res.status(403).json('Not acceptted');
            }

        })
        .catch((error) => {
            res.status(400).json(error);
        });
});
module.exports = router;
const express = require('express')
const {
    createPost,
    likeAndUnlinkePost,
    deletePost,
    getPostOffollowing,
    updateCaption,
    commentOnPost,
    deleteComment,
    sharePost,
} = require('../controllers/post')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.route('/post/upload').post(isAuthenticated, createPost)

router.route('/post/:id').get(isAuthenticated, likeAndUnlinkePost).put(isAuthenticated,updateCaption).delete(isAuthenticated, deletePost)

router.route("/uniquepost/:id").get(isAuthenticated,sharePost)

router.route("/posts").get(isAuthenticated,getPostOffollowing)

router.route("/post/comment/:id").put(isAuthenticated,commentOnPost).delete(isAuthenticated,deleteComment)

// localhost:4000/api/v1/post/upload

module.exports = router

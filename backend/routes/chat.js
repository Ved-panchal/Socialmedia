const express = require("express")
const { isAuthenticated } = require('../middlewares/auth');
const { accessChat, fetchChats } = require("../controllers/chat");

const router = express.Router();

router.route("/chat").post(isAuthenticated, accessChat).get(isAuthenticated,fetchChats);

module.exports = router;
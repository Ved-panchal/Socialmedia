const express = require("express")
const { isAuthenticated } = require('../middlewares/auth');
const { sendMessage, allMessages } = require("../controllers/message");

const router = express.Router();

router.route("/message").post(isAuthenticated,sendMessage)
router.route("/message/:chatId").get(isAuthenticated,allMessages)

module.exports = router;
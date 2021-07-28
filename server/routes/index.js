const express = require("express");
const users = require("../controllers/users");
const info = require("../controllers/info");

const router = express.Router();

router.post("/login", users.login);
router.post("/collection_list", info.collection_list);

module.exports = router;

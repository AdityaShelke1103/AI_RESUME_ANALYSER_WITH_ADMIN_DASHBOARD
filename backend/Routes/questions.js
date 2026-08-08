const express = require("express");
const router = express.Router();

const {
    generateQuestion,
} = require("../Controllers/questions");

router.post("/generate", generateQuestion);

module.exports = router;
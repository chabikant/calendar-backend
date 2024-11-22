
const express = require("express");

const router =express.Router()
const { createEvent, getEvents } = require('../controller/Event');

router.route('/').post(createEvent).get(getEvents)

module.exports = router;

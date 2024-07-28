const express = require('express');
const authenticate = require('../middlewares/authenticate');
const { createEvent, getEvents, getEvent, getEventsByGroup, updateEvent, deleteEvent } = require('../Controllers/EventController');
const uploadMulter = require('../middlewares/imageUploader')
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();




/* create an event */

router.post('/create', authenticate, uploadMulter.single("image"), checkAdmin, createEvent)

/* get all events */

router.get('/all', authenticate, getEvents)

/* get a single event */

router.get('/:eventId', authenticate, getEvent)

/* get all events by a related group Id */

router.get('/group/:groupId', authenticate, getEventsByGroup)

/* delete an event */

router.delete('/:eventId', authenticate, checkAdmin, deleteEvent);







module.exports = router;
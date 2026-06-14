const express = require('express');
const router = express.Router();
const { listEvents, getEvent, createEventHandler, deleteEventHandler } = require('../controllers/eventController');

router.get('/', listEvents);
router.get('/:id', getEvent);
router.post('/', createEventHandler);
router.delete('/:id', deleteEventHandler);

module.exports = router;

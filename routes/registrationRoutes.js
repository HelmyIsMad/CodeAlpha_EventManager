const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  getUserRegistrations,
  cancelRegistration,
} = require('../controllers/registrationController');

router.post('/', registerForEvent);
router.get('/users/:userId/registrations', getUserRegistrations);
router.delete('/:id', cancelRegistration);

module.exports = router;

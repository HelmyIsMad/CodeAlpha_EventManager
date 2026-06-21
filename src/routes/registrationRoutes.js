const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  getUserRegistrations,
  listAllRegistrations,
  cancelRegistration,
} = require('../controllers/registrationController');

router.post('/', registerForEvent);
router.get('/users/:userId/registrations', getUserRegistrations);
router.get('/', listAllRegistrations);
router.delete('/:id', cancelRegistration);

module.exports = router;

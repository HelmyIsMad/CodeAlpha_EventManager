const express = require('express');
const router = express.Router();
const { listUsers } = require('../controllers/userController');
const { getUserRegistrations } = require('../controllers/registrationController');

router.get('/', listUsers);
router.get('/:userId/registrations', getUserRegistrations);

module.exports = router;

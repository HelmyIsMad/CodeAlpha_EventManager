const User = require('../models/User');
const Registration = require('../models/Registration');

const registerForEvent = async (req, res) => {
  try {
    const { name, email, user_id, event_id } = req.body;

    if (!event_id || isNaN(parseInt(event_id))) {
      return res.status(400).json({ error: 'A valid event_id is required' });
    }

    let user;
    if (user_id) {
      user = await User.getUserById(parseInt(user_id));
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    } else {
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }
      if (!email || !email.trim()) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      user = await User.findOrCreateUser(name.trim(), email.trim().toLowerCase());
    }

    const registration = await Registration.createRegistration(user.id, parseInt(event_id));
    res.status(201).json(registration);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'User is already registered for this event' });
    }
    if (err.code === '23503') {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.error('Error registering for event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserRegistrations = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await User.getUserById(parseInt(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const registrations = await Registration.getRegistrationsByUser(parseInt(userId));
    res.status(200).json(registrations);
  } catch (err) {
    console.error('Error fetching user registrations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }
    const deleted = await Registration.deleteRegistration(parseInt(id));
    if (!deleted) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.status(200).json({ message: 'Registration cancelled successfully', id: deleted.id });
  } catch (err) {
    console.error('Error cancelling registration:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const listAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.getAllRegistrations();
    res.status(200).json(registrations);
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerForEvent, getUserRegistrations, listAllRegistrations, cancelRegistration };

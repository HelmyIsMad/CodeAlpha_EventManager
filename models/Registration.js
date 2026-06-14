const pool = require('../config/db');

const createRegistration = async (userId, eventId) => {
  const result = await pool.query(
    `INSERT INTO registrations (user_id, event_id)
     VALUES ($1, $2)
     RETURNING id, user_id, event_id, registered_at`,
    [userId, eventId]
  );
  return result.rows[0];
};

const getRegistrationsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT r.id, r.registered_at, e.id AS event_id, e.title, e.description, e.date, e.location
     FROM registrations r
     JOIN events e ON r.event_id = e.id
     WHERE r.user_id = $1
     ORDER BY e.date ASC`,
    [userId]
  );
  return result.rows;
};

const deleteRegistration = async (id) => {
  const result = await pool.query(
    'DELETE FROM registrations WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0] || null;
};

const getAllRegistrations = async () => {
  const result = await pool.query(
    `SELECT r.id, r.registered_at, r.user_id, u.name AS user_name, u.email AS user_email,
            r.event_id, e.title AS event_title, e.date AS event_date, e.location AS event_location
     FROM registrations r
     JOIN users u ON r.user_id = u.id
     JOIN events e ON r.event_id = e.id
     ORDER BY r.registered_at DESC`
  );
  return result.rows;
};

module.exports = { createRegistration, getRegistrationsByUser, getAllRegistrations, deleteRegistration };

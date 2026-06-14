const pool = require('../config/db');

const getAllEvents = async () => {
  const result = await pool.query(
    'SELECT id, title, description, date, location, created_at FROM events ORDER BY date ASC'
  );
  return result.rows;
};

const getEventById = async (id) => {
  const result = await pool.query(
    'SELECT id, title, description, date, location, created_at FROM events WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

module.exports = { getAllEvents, getEventById };

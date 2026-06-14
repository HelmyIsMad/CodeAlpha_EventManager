const pool = require('../config/db');

const findOrCreateUser = async (name, email) => {
  const existing = await pool.query(
    'SELECT id, name, email FROM users WHERE email = $1',
    [email]
  );
  if (existing.rows.length > 0) {
    return existing.rows[0];
  }
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
    [name, email]
  );
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

module.exports = { findOrCreateUser, getUserById };

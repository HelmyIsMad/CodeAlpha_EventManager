const pool = require('../config/db');

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date TIMESTAMP NOT NULL,
      location VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      registered_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, event_id)
    );
  `;

  try {
    await pool.query(query);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

const seedEvents = async () => {
  const check = await pool.query('SELECT COUNT(*) FROM events');
  if (parseInt(check.rows[0].count) > 0) return;

  const seedQuery = `
    INSERT INTO events (title, description, date, location) VALUES
      ('Tech Conference 2026', 'A conference about emerging technologies.', '2026-08-15 09:00:00', 'San Francisco, CA'),
      ('Music Festival', 'Live performances from top artists.', '2026-09-20 16:00:00', 'Austin, TX'),
      ('Startup Pitch Night', 'Entrepreneurs pitch their ideas to investors.', '2026-07-10 18:00:00', 'New York, NY'),
      ('Community Clean-Up', 'Volunteer event to clean local parks.', '2026-06-25 08:00:00', 'Portland, OR')
    ON CONFLICT DO NOTHING;
  `;

  try {
    await pool.query(seedQuery);
    console.log('Seed events inserted.');
  } catch (err) {
    console.error('Error seeding events:', err);
  }
};

const initDatabase = async () => {
  await createTables();
  await seedEvents();
};

module.exports = initDatabase;

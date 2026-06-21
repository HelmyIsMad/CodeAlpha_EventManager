const app = require('../../server');
const initDatabase = require('../models/init');

initDatabase().catch((err) => {
  console.error('Database init error:', err);
});

module.exports = app;

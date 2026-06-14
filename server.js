const express = require('express');
const cors = require('cors');
require('dotenv').config();

const initDatabase = require('./models/init');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/register', registrationRoutes);
app.use('/api/registrations', registrationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Event Registration System API' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

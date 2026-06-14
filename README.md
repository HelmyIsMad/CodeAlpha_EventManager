# Event Registration System

A scalable backend for managing event registrations, built with Express.js and PostgreSQL (Neon.tech).

**Live demo:** [https://code-alpha-event-manager.vercel.app/](https://code-alpha-event-manager.vercel.app/)  
**Admin panel:** [https://code-alpha-event-manager.vercel.app/admin](https://code-alpha-event-manager.vercel.app/admin)

## Setup

1. Clone the repo and install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your Neon database URL:
   ```
   DATABASE_URL=postgresql://user:pass@ep-example.us-east-2.aws.neon.tech/neondb
   ```

3. Start the server:
   ```
   npm start
   ```
   Tables and seed data (4 events) are created automatically on first run.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List all events |
| GET | `/api/events/:id` | Get event details |
| POST | `/api/register` | Register a user for an event |
| GET | `/api/users/:userId/registrations` | View user's registrations |
| DELETE | `/api/registrations/:id` | Cancel a registration |

### POST /api/register

**New user:**
```json
{ "name": "Jane Doe", "email": "jane@example.com", "event_id": 1 }
```

**Existing user (by user_id):**
```json
{ "user_id": 1, "event_id": 2 }
```

## Tech Stack

- **Express.js** — web framework
- **pg** — PostgreSQL client
- **Neon.tech** — serverless PostgreSQL (SSL enabled)
- **dotenv** — environment variables
- **cors** — cross-origin support

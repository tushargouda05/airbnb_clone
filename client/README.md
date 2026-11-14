# Staybnb

An Airbnb inspired stays marketplace built with React, Vite, Express, and MongoDB.

## Start the app

1. Install the server dependencies with `cd server && npm install`.
2. Create `server/.env` with `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, and `SESSION_SECRET`.
3. Add sample accounts and stays with `cd server && npm run seed:demo`.
4. Start the API with `cd server && npm run dev` (default port `8000`).
5. Install and start the client with `cd client && npm install && npm run dev`.

The client uses `http://localhost:8000` by default. Set `VITE_API_URL` in `client/.env` to override it. Set `CLIENT_ORIGIN` in `server/.env` when the client runs at a different origin.

Sample listings are also bundled in the client, so the home and detail pages remain explorable before a database is connected. Sample reservations are saved in the current browser. With the server and database running, the seed command creates eight MongoDB stays and this demo login:

- Email: `demo@staybnb.test`
- Password: `StaybnbDemo2026!`

Login and sign-up open as dialogs over the home page. The account menu provides account, host, listing, and sign-out navigation.

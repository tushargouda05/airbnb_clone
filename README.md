# Staybnb

An Airbnb-inspired stays marketplace with a React/Vite client and Express/MongoDB API.

## Requirements

- Node.js and npm
- MongoDB

## Run locally

1. Copy `server/.env.example` to `server/.env` and set your MongoDB URI and local secrets.
2. Install server dependencies: `cd server && npm install`.
3. Seed the demo host and eight sample listings: `npm run seed:demo`.
4. Start the API: `npm run dev` (default port `8000`).
5. In another terminal, install and start the client: `cd client && npm install && npm run dev`.

The client defaults to `http://localhost:8000`. Set `VITE_API_URL` in `client/.env` to use a different API URL. Set `CLIENT_ORIGIN` in `server/.env` if the client uses a different origin.

## Demo account

- Email: `demo@staybnb.test`
- Password: `StaybnbDemo2026!`

The home page includes bundled sample listings when the API is unavailable. Login and sign-up appear in dialogs; sample reservations and favorites are stored in the browser.

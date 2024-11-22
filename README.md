
# Datanexify Backend

This is the backend application for the Dashboard, which handles authentication, event creation, and session management. The backend is built using Node.js and Express and uses the Google Calendar API for event management.

## Features

- **Google OAuth 2.0 Login**: Allows users to log in securely using their Google accounts.
- **Event Management**: Create and retrieve Google Calendar events for authenticated users.
- **Session Management**: Manages user sessions with cookies, ensuring secure access to resources.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- **Google Cloud Project** with OAuth 2.0 credentials configured

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saran-mani/datanexify-backend.git
   cd datanexify-backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
   or, if you prefer yarn:
   ```bash
   yarn install
   ```

### Configuration

1. **Set up Google OAuth Credentials**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or use an existing one.
   - Enable the **Google Calendar API** and configure OAuth 2.0 credentials.
   - Set the redirect URI to `http://localhost:5000/auth/google/callback`.

2. **Environment Variables**:
   Create a `.env` file in the project root with the following variables:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   GOOGLE_CALLBACK_URL=your_google_oauth_callback_url
   ```

### Running the Application

1. Start the backend server:
   ```bash
   npm start
   ```
   or, with nodemon for development:
   ```bash
   npm run dev
   ```

2. The backend server should be running on `http://localhost:5000`.

### Endpoints

- **`GET /auth/google`**: Initiates Google OAuth login.
- **`GET /auth/google/callback`**: Handles OAuth callback and session creation.
- **`GET /auth/status`**: Checks if the user is authenticated.
- **`GET /auth/logout`**: Logs the user out and destroys the session.
- **`GET /event`**: Retrieves the user's upcoming events from Google Calendar.
- **`POST /event`**: Creates a new Google Calendar event for the user.

## Dependencies

- **Express**: Web framework for Node.js.
- **Passport**: Authentication middleware for Node.js.
- **Passport-Google-OAuth20**: Strategy for Google OAuth 2.0 authentication.
- **Googleapis**: Google API client for Node.js.
- **dotenv**: For loading environment variables.

## Troubleshooting

- **OAuth Errors**: Ensure the Google OAuth credentials and redirect URIs are set correctly.
- **CORS Issues**: Ensure the backend allows requests from the frontend origin.

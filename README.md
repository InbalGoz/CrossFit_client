CrossFit - Gym Management Web App(Client)

A React + TypeScript client for managing CrossFit/gym operations: schedules, class enrollment, admin dashboards, and user notifications. Built with a clean MUI-based UI and Redux-powered state management.

**Tech Stack:** React + TypeScript + Material UI, React Router, Redux Toolkit, Axios, date-fns / moment-timezone, Scheduler: @aldabil/react-scheduler

## Features

- Authentication (Sign Up / Login) with protected routes
- Weekly class scheduling with interactive calendar
- Enroll / unsubscribe from lessons (per user)
- Admin views for managing customers and lessons
- Notifications inbox for users
- State management with Redux Toolkit
- Material UI components and responsive layout

## Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git

# Navigate to the project directory
cd your-repo

# Install dependencies
npm install
```

## Usage
```bash
# Start the development server
npm start
```

Once running, open http://localhost:3000.  
- The client expects a backend API at `https://my-crossfit-app.herokuapp.com` (configurable in `src/env/dev.js`).


## License

This project is licensed under the MIT License.



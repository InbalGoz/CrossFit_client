import React from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import LandingPage from './pages/Landing';
import Admin from './pages/Admin';
import Notifications from './pages/Notifications';
import SchedulerPage from './pages/SchedulerPage';
import './App.css';


const App: React.FC = () => {
  return (
    <>
      <Router>
         <main className='py-3'>
           <Routes>
              <Route  path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/scheduler" element={<SchedulerPage  />} />
              <Route path="/admin/:adminActions" element={<Admin />} />
            </Routes>
         </main>
      </Router>
    </>
  );
}

export default App;

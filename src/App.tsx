import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LandingPage from "./pages/Landing";
import Admin from "./pages/Admin";
import Notifications from "./pages/Notifications";
import SchedulerPage from "./pages/SchedulerPage";
import "./App.css";

import PrivateRoute from "./utils/PrivateRoute";

//redux
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getLoggedUser, logOut } from "./store/actions/authActions";
import { getNotificationsByCustomerId } from "./store/actions/notificationActions";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  console.log("token", token);

  const { user, user_type } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getLoggedUser(token));
      
    }

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) dispatch(logOut());
    });
  }, []);

  useEffect(() => {
    if (user && user_type === "customer") {
      dispatch(getNotificationsByCustomerId(user.id));
    }
  }, [user]);

  return (
    <>
      <Router>
        <main className='py-3'>
          <Routes>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />

            {/* {user.isAdmin && ( */}
            <Route
              path='admin/:adminActions'
              element={<PrivateRoute component={Admin} />}
            />
            {/* )} */}
            <Route path='home' element={<PrivateRoute component={Home} />} />
            <Route
              path='notifications'
              element={<PrivateRoute component={Notifications} />}
            />
            <Route
              path='scheduler'
              element={<PrivateRoute component={SchedulerPage} />}
            />
            <Route path='/' element={<LandingPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
};

export default App;

/*
 <>
      <Router>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home/:id' element={<Home />} />
            <Route path='/notifications/:id' element={<Notifications />} />
            <Route path='/scheduler/:id' element={<SchedulerPage />} />
            <Route path='/admin/:adminActions' element={<Admin />} />
          </Routes>
        </main>
      </Router>
    </>*/

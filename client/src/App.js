import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from 'react';
import Modal from 'react-modal';
import Calendar from "./components/Calendar"
import Email from "./components/Email"
import Result from "./components/result"
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";


// Routing
//import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen/PrivateScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen/ResetPasswordScreen";
import LogoutScreen from "./components/screens/LogoutScreen/LogoutScreen";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import Exercisedatabase from './components/exercisedatabase.component';
import Createworkout from './components/createworkout.component';
import Findworkout from "./components/findworkout.component";
//Add this to routes >> <Route path="/createworkout" element={<Createworkout />} />

Modal.setAppElement('#root')

const App = () => {
  const loggedIn = localStorage.getItem("isLoggedIn");


  if (loggedIn != null) {
    return (
      <Router>
        <div className="topnav">
          <a href="/" className="left">Home</a>
          <a href="/createworkout" className="left">Create Workout</a>
          <a href="/exercisedatabase" className="left">Exercise Database</a>
          <a href="/findworkout" className="left">Find Workout</a>
          <a href="/calendar" className="left">Workout Schedule</a>
          <a href="/email" className="left">Get Verified</a>
          <a href="/chat" className="left">Messages</a>
          <a href="/logout" className="right">Logout</a>
        </div>
        <div className="app">
          <Routes>
            <Route exact path="/exercise" element={<PrivateScreen />} />
            <Route exact path="/logout" element={<LogoutScreen />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<HomeScreen />} />

            <Route
              exact
              path="/forgotpassword"
              element={<ForgotPasswordScreen />}
            />
            <Route
              exact
              path="/passwordreset/:resetToken"
              element={<ResetPasswordScreen />}
            />
            <Route path="/exercisedatabase" element={<Exercisedatabase />} />
            <Route path="/createworkout" element={<Createworkout />} />
            <Route path="/findworkout" element={<Findworkout />} />

            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/email" element={<Email />} />
            <Route exact path="/result" element={<Result />} />
          </Routes>
        </div>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <div class="topnav">
          <a href="/" className="left">Home</a>
          <a href="/login" className="right">Login</a>
        </div>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/logout" element={<LogoutScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              exact
              path="/forgotpassword"
              element={<ForgotPasswordScreen />}
            />
            <Route
              exact
              path="/passwordreset/:resetToken"
              element={<ResetPasswordScreen />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
};

export default App;

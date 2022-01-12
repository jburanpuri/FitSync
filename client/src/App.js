import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
//import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen/ResetPasswordScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen/WelcomeScreen";

const App = () => {
  return (
    <Router>
      <div class="topnav">
        <a href="active" href="#home">Home</a>
        <a href="/">Create Workout</a>
        <a href="/login">Login</a>
        <a href="/logout">Logout</a>
      </div>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<PrivateScreen />} />
          <Route exact path="/logout" element={<WelcomeScreen />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
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
};

export default App;
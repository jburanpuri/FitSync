import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";

// Routing
//import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen/ResetPasswordScreen";
import LogoutScreen from "./components/screens/LogoutScreen/LogoutScreen";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import Exercisedatabase from './components/exercisedatabase.component';
//import Createworkout from './components/createworkout.component';
//Add this to routes >> <Route path="/createworkout" element={<Createworkout />} />

const App = () => {
  const loggedIn = localStorage.getItem("isLoggedIn");


  if (loggedIn != null) {
    return (
      <Router>
        <div className="topnav">
          <a href="/" class="left">Home</a>
          <a href="/createworkout" class="left">CreateWorkout</a>
          <a href="/exercisedatabase" class="left">Exercise Database</a>
          <a href="/messages" class="left">Chat</a>
          <a href="/logout" class="right">Logout</a>
        </div>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/exercise" element={<PrivateScreen />} />
            <Route exact path="/logout" element={<LogoutScreen />} />
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/register" element={<RegisterScreen />} />
            <Route path="/messenger"> {<Messenger />}
            </Route>

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
          </Routes>
        </div>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <div class="topnav">
          <a href="/" class="left">Home</a>
          <a href="/login" class="right">Login</a>
        </div>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/exercise" element={<PrivateScreen />} />
            <Route exact path="/logout" element={<LogoutScreen />} />
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
  }
};

export default App;

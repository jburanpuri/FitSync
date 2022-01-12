import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen/ResetPasswordScreen";
import Navbar from "./components/Navbar.component";
import Exercisedatabase from './components/exercisedatabase.component';
import Createworkout from './components/createworkout.component';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route PrivateRoute path="/homepage" element={<PrivateScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
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
          <Route path="/exercisedatabase" element={ <Exercisedatabase/>}/>
          <Route path="/createworkout" element={ <Createworkout/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

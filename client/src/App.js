import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import './App.css'

import Navbar from "./components/Navbar.component";
import Exercisedatabase from './components/exercisedatabase.component';
import Createworkout from './components/createworkout.component';

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337//api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
  }

  //const data = await response.json()
  return (
    <Router>   
      
      <Navbar />
 
     {/* <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
     
    </div> */}
  <Routes>
    <Route path="/exercisedatabase" element={ <Exercisedatabase/> }/>
    <Route path="/createworkout" element={ <Createworkout/> }/>
  </Routes>
  
</Router>
  
  );
}
export default App;

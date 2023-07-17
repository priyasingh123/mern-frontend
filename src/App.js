import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import LogOut from './components/LogOut';
import LoginState from './context/login/LoginState';

function App() {
  const [alert, setAlert] = useState(null)
  const [loggedIn, setLogin] = useState(false)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3500)
  }

  const changeLogin = (bool, msg) => {
    console.log(bool, msg)
    setLogin(bool)
  }

  return (

    <NoteState>
      <Router>
        <Navbar isLogin={loggedIn} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path='/login' element={<LogIn changeLogin={changeLogin} showAlert={showAlert} />}></Route>
          <Route exact path='/signup' element={<SignUp showAlert={showAlert} />}></Route>
          <Route exact path='/logout' element={<LogOut changeLogin={changeLogin} />}></Route>
        </Routes>
      </Router>
      </NoteState>
    
  );
}

export default App;

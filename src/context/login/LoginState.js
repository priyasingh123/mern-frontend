import React, {useState} from 'react'
import LoginContext from './LoginContext'

 const LoginState = (props) => {

  const [loggedIn, setLogin] = useState (false)
  //update variable loggedIn to true or false accordingly
  const changeLogin = (bool, msg) => {
    console.log (bool, msg)
    setLogin(bool)
  }


  <LoginContext.Provider value={{changeLogin, loggedIn}}>
    {props.children}
  </LoginContext.Provider>

}

export default LoginState

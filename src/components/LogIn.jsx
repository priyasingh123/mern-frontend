import React, { useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const LogIn = (props) => {
  // const host = process.env.REACT_APP_HOST
  const [credentials, setCredentials] = useState({email: '', password:''})
  let navigate = useNavigate()

  useEffect (() => {
    setCredentials({email: '', password:''})

  },[])

  const onSubmission = async (e) => {
    e.preventDefault()
    //API call for login
    try {
      const res = await fetch (`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      })
      if (res.status === 200) {
        const json = await res.json()
        // props.changeLogin(true, 'from login')

        //save the authToken and redirect
        localStorage.setItem('token',json.authToken)
        navigate('/')
      }
      else {
        props.showAlert ('Not correct User', 'danger')
        setCredentials({email: '', password:''})
      }
    } catch (error) {
        console.log (error)
        setCredentials({email: '', password:''})
    }
  }

  const onChangeEvent = (e) => {
    setCredentials({...credentials, [e.target.id]: e.target.value})
  }

  return (
    <div className='container' style={{ marginTop: '30px' }}>
      <h2 className='my-3'>LogIn</h2>
      <form onSubmit={onSubmission}>
        <div className="form-group">
          <label htmlFor="email"><strong>Email:</strong></label>
          <input type="text" className="form-control" id="email" value={credentials.email} onChange={onChangeEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="password"><strong>Password:</strong></label>
          <input type="password" className="form-control" id="password" value={credentials.password} autoComplete="on" onChange={onChangeEvent}/>
        </div>
        <button className='btn btn-primary my-3' type='submit'> Submit
        </button>
      </form>
    </div>
  )
}

export default LogIn

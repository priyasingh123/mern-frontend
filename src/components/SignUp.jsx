import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword:'' })
    const onChangeEvent = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }
    const onSubmission = async (e) => {
        e.preventDefault()
        const {name, email, password} = credentials;
        try {
            //API call
            const res = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })
            if (res.status === 200) {
                // eslint-disable-next-line
                const json = res.json()
                navigate('/login')
            }
            else {
                props.showAlert ('SignUp Failed', 'danger')
                setCredentials({ name: '', email: '', password: '', cpassword:'' })
            }
        } catch (error) {
            props.showAlert ('Some error Occured', 'danger')
            setCredentials({ name: '', email: '', password: '', cpassword:'' })
        }
    }

    return (
        <div className='container' style={{ marginTop: '30px' }}>
            <h2>Sign Up</h2>
            <form onSubmit={onSubmission}>
                <div className="form-group">
                    <label htmlFor="name"><strong>Name:</strong></label>
                    <input type="text" className="form-control" id="name" value={credentials.name} onChange={onChangeEvent} />
                </div>
                <div className="form-group">
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChangeEvent} />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChangeEvent} />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword"><strong>Confirm Password:</strong></label>
                    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChangeEvent} />
                </div>
                <button className='btn btn-primary my-3' type='submit'> Submit
                </button>
            </form>
        </div>
    )
}

export default SignUp

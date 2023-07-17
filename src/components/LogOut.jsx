import React, { useEffect } from 'react'

export default function LogOut(props) {
    useEffect (() => {
        localStorage.removeItem('token')
        props.changeLogin(false, 'from login')
    },)
  return (
    <div className="container text-center" style={{ marginTop: '60px' }}>
      <h4>You have successfully logged Out</h4>
    </div>
  )
}

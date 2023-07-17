import React, { useEffect } from 'react'

export default function LogOut(props) {
    useEffect ((props) => {
        props?.changeLogin(false, 'from logout')
        console.log ('logout')
        localStorage.removeItem('token')
    },[props.changeLogin])
  return (
    <div className="container text-center" style={{ marginTop: '30px' }}>
      <h4>You have successfully logged Out</h4>
    </div>
  )
}

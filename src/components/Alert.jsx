import React from 'react'

export default function Alert(props) {
    return (
        <div className={`alert alert-${props?.alert?.type} fixed-top`} role="alert" style={{marginTop: '50px'}}>
            {props?.alert?.msg}
        </div>
    )
}

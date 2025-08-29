import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = ({children}) => {
    const navigate = useNavigate()

    useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken)(
        navigate("/login")
    )
    }, [navigate])
  return (
    <div>
      {children}
    </div>
  )
}

export default Auth

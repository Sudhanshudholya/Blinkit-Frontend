import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import { useLogoutMutation } from '../services/logOutSlice'
import toast from 'react-hot-toast'

const UserMenu = () => {
  const user = useSelector((state) => state?.user)
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  const handleLogOut = async () => {
       try {
        const res = await logout().unwrap()
        if(res){
          toast.success(res?.message || "User Logout successfully")
          dispatch(logout())
          localStorage.clear()
        }
       } catch (error) {
        toast.error(error || "Something went wron to logout user")
       }


  }
  return (
    <div>
      <div className='font-bold'>
        My account
      </div>
      <div className='font-sans'>
        {user.name || user.mobile}
      </div>

      <Divider/>

      <div className='text-sm grid gap-2'>

        <Link to={""} className='px-2'>
        My Orders
        </Link>

        <Link to={""}  className='px-2'>
        Save Address
        </Link>

        <button onClick={handleLogOut} className='text-left px-2'>LogOut</button>
      </div>
    </div>
  )
}

export default UserMenu


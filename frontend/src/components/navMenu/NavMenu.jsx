import {  FaUserCircle, FaShoppingCart, FaRegUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import NavItem from '../navItems/NavItem'
import DropDownMenu from '../dropDownMenu/DropDownMenu'
import DropDownItem from '../dropDownMenu/DropDownItem'

import './navMenu.css'

function NavMenu() {
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Retrieves the token from the cookie
  const token = document.cookie.split('; ').filter(row => row.startsWith('token')).map(c=>c.split('=')[1])[0]

  const onLogout = () => {
    dispatch(logout(token))
    dispatch(reset())

    navigate('/')
  }

  return (
    <ul className="navbar-nav">
        <NavItem icon={<FaShoppingCart />} link="/cart" />
      {/* Displays logout if there user is logged in */}
      {user ? (<>
        <NavItem icon={<FaUserCircle />} >
          <DropDownMenu>
            <DropDownItem link="/Profile" text="Profile" />
            <DropDownItem text="Logout" onClick={onLogout} />
          </DropDownMenu>
        </NavItem>
        </>) : (<>
        <NavItem icon={<FaRegUser />}>
          <DropDownMenu>
            <DropDownItem link='/SignUp' text='Register' />
            <DropDownItem link='/SignIn' text='Login' />
          </DropDownMenu>
        </NavItem>
      </>)}
    </ul>
  )
}
export default NavMenu
import { FaSignInAlt, FaUserCircle, FaShoppingCart, FaRegUser } from 'react-icons/fa'
import {useSelector } from 'react-redux'
import NavItem from '../navItems/NavItem'
import DropDownMenu from '../dropDownMenu/DropDownMenu'

import './NavMenu.css'

function NavMenu(props) {
  const {user} = useSelector((state) => state.auth)

  return (
    <ul className="navbar-nav">
        <NavItem icon={<FaShoppingCart />} link="/cart" />
      {/* Displays logout if there user is logged in */}
      {user ? (<>
        <NavItem icon={<FaUserCircle />} >
          <DropDownMenu />
        </NavItem>
        </>) : (<>
        <NavItem icon={<FaSignInAlt />} link="/SignIn" text="Login" />
        <NavItem icon={<FaRegUser />} link="/SignUp" text="Register" />
      </>)}
    </ul>
  )
}
export default NavMenu
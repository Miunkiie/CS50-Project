import { Link } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import "./DropDownMenu.css"

function DropDownMenu(props) {
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
    <div className="dropdown">
        <Link to="/Profile" className="menu-item">
            Profile
        </Link>
        <Link className='menu-item' onClick={onLogout}>Logout</Link>
    </div>
  )
}
export default DropDownMenu
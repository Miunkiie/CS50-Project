import { FaSignInAlt, FaSignOutAlt, FaShoppingCart, FaUser, FaRegUser, FaCentercode } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <div>
            <Link to='/'>Elite</Link>
        </div>
        <ul>
            <li>
                <Link to='/Men'>Men</Link>
            </li>
            <li>
                <Link to='/Women'>Women</Link>
            </li>
            <li>
                <Link to='/Kids'>Kids</Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to='/SignIn'>
                    <FaSignInAlt /> Sign In
                </Link>
            </li>
            <li>
                <Link to='/SignUp'>
                    <FaRegUser /> Join us!
                </Link>
            </li>
        </ul>
    </header>
  )
}
export default Header
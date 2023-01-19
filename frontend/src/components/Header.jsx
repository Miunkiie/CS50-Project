import { Link } from 'react-router-dom'
import NavMenu from './navMenu/NavMenu.jsx'

function Header() {
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Generic</Link>
        </div>
        <ul className='menu-header'>
            <li>
                <Link to="/Men">Men</Link>
            </li>
            <li>
                <Link to='/Women'>Women</Link>
            </li>
            <li>
                <Link to='/Kids'>Kids</Link>
            </li>
        </ul>
        <NavMenu />
    </header>
  )
}
export default Header
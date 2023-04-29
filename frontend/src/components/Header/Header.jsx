import { Link } from 'react-router-dom'

import NavMenu from '../navMenu/NavMenu.jsx'

import './header.css'

function Header() {
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Generic</Link>
        </div>
        <div>
            <ul className='menu-header'>
                <li>
                    <Link reloadDocument to="/collections/men">Men</Link>
                </li>
                <li>
                    <Link reloadDocument to='/collections/women'>Women</Link>
                </li>
            </ul>
        </div>
        <NavMenu />
    </header>
  )
}
export default Header
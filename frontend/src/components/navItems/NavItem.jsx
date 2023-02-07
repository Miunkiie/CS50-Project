import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import './navItem.css'


function NavItem(props) {
  const [open, setOpen] = useState(false)

  const dropDownMenu = useRef(null)

  // Function for handleOutsideClicks
  const handleOutsideClicks = (e) => {
    if (open && dropDownMenu.current && !dropDownMenu.current.contains(e.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    // Bind event listener
    document.addEventListener("mousedown", handleOutsideClicks)
    
      return () => {
        document.removeEventListener("mousedown", handleOutsideClicks)
      }
  })


  return (
    <li className="nav-item">
      <Link to={props.link} className="icon-button" onClick={() => setOpen(!open)} ref={dropDownMenu}>
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  )
}
export default NavItem
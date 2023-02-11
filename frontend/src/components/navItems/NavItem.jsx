import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './navItem.css'


function NavItem(props) {
  const [open, setOpen] = useState(false)

  const dropDownRef = useRef(null)

  // Function for handleOutsideClicks
  const handleOutsideClicks = (e) => {
    if (open && dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      console.log('clicked outside')
      setOpen(false)
    }
  }

  useEffect(() => {
    // Bind event listener
    document.addEventListener("mousedown", handleOutsideClicks)
    
      return () => {
        document.removeEventListener("mousedown", handleOutsideClicks)
      }
  }, [dropDownRef, handleOutsideClicks]) 
  

  return (
    <li className="nav-item" ref={dropDownRef}>
      <Link className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  )
}
export default NavItem
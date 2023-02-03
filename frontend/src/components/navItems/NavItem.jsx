import { Link } from 'react-router-dom'
import { useState } from 'react'  

function NavItem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className="nav-item">
      <Link to={props.link} className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  )
}
export default NavItem
import { Link } from 'react-router-dom'
import "./DropDownMenu.css"

function DropDownItem({link, text, onClick}) {
  return (
        <Link to={link} className="menu-item" onClick={onClick} >
            {text}
        </Link>
  )
}
export default DropDownItem
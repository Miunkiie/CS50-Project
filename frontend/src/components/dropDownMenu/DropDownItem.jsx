import { Link } from 'react-router-dom'

function DropDownItem({link, text, onClick}) {
  return (
        <Link to={link} className="menu-item" onClick={onClick} >
            {text}
        </Link>
  )
}
export default DropDownItem
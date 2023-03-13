import './DropDownMenu.css'

function DropDownMenu({children}) {
  return (
    <div className="dropdown">
      {children}
    </div>
  )
}
export default DropDownMenu
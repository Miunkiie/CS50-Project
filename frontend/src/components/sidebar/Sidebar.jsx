import './sidebar.css'

function Sidebar({children, heading}) {
  return (
    <div className="sidebar">
        <h2>{heading}</h2>
          {children}
    </div>
  )
}
export default Sidebar
import './sidebar.css'

function Sidebar({children}) {
  return (
    <div className="sidebar">
        <h2>Categories</h2>
          {children}
    </div>
  )
}
export default Sidebar
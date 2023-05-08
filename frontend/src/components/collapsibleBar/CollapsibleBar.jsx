import './CollapsibleBar.css'

function CollapsibleBar({ children }) {

  return (
    <div className='collapsible-bar'>
      { children }
    </div>
  )
}
export default CollapsibleBar
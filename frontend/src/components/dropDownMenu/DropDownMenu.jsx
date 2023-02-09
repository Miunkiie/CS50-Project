import { useRef, useState, useEffect } from 'react'

function DropDownMenu({children}) {
  const [open, setOpen] = useState(true)

  const dropDownMenu = useRef(null)

  // Function for handleOutsideClicks
  const handleOutsideClicks = (e) => {
    if (open && dropDownMenu.current && !dropDownMenu.current.contains(e.target)) {
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
  })

  return (
    open ?
      <div className="dropdown" onClick={() => setOpen(!open)} ref={dropDownMenu}>
        {children}
      </div>
       : null
  )
}
export default DropDownMenu
import { Link, useParams } from 'react-router-dom'
import { useState, useRef } from 'react'

import { SlArrowDown } from 'react-icons/sl'

import './CollapsibleBar.css'

function CollapsibleBar({categories, subCategory}) {
  const [open, setOpen] = useState(false)
  const {gender} = useParams()

  const toggle = useRef(null)    

  const category = subCategory.map(category => 
    <Link to={`/collections/${gender}/${category.toLowerCase()}`}
      reloadDocument key={category} value={category}>
      {category}
    </Link>
  )
  
  return (
    <div className='collapsible-bar'>
        <button ref={toggle} onClick={() => setOpen(!open)}>
          {categories}
          <SlArrowDown />
        </button>
        {open && category}
    </div>
  )
}
export default CollapsibleBar
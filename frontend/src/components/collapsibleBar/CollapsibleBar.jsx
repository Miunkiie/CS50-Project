import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'

import { SlArrowDown } from 'react-icons/sl'

import './CollapsibleBar.css'

function CollapsibleBar({ categories, subCategory, setCategory }) {
  const [open, setOpen] = useState(false)  
  const isActive = useRef(null)

  const changeCategory = (e) => {
    setCategory(prevState => ({
      ...prevState,
      category: e.target.dataset.category.toLowerCase()
    }))
  }

  // Maps the subcategories
  const subCategories = subCategory.map(category => 
    <NavLink ref={isActive} onClick={changeCategory} data-category={category} 
    to={`${category.toLowerCase()}`} key={category}>
      {category}
    </NavLink>
  )

  return (
    <div className='collapsible-bar'>
        <button onClick={() => setOpen(!open)}>
          {categories}
          <SlArrowDown />
        </button>
        {open && subCategories}
    </div>
  )
}
export default CollapsibleBar
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

import { SlArrowDown } from 'react-icons/sl'
import './sideBarLink.css'

function SideBarLink({ category, subCategory, setCategory }) {
    const [open, setOpen] = useState(false)

    const changeCategory = (e) => {
        setCategory(prevState => ({
            ...prevState,
            category: e.target.dataset.category.toLowerCase()
        }))
    }

    // Maps the subcategories
    const subCategories = subCategory.map(category => 
        <NavLink onClick={changeCategory} data-category={category} 
        to={`${category.toLowerCase()}`} key={category}>
        {category}
    </NavLink>
  )
  return (
    <>
        <button onClick={() => setOpen(!open)}>
            {category}
            <SlArrowDown />
        </button>
        {open && subCategories} 
    </>
  )
}
export default SideBarLink
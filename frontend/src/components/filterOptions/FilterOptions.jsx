import { useState } from 'react'

import './filterOptions.css'
import { SlArrowDown } from 'react-icons/sl'


function FilterOptions({ setFilters, category, subCategory }) {
  const [open, setOpen] = useState(false)

  // Add filtered options
  const updateFilters = (e) => {
    setFilters(prevState => ({
        ...prevState,
        category: e.target.value.toLowerCase()
    }))
  }

  const subCategories = subCategory.map(category =>
    <label className="form-control" key={category}> 
      <input type="checkbox" name={category} onClick={updateFilters} value={category} />
      {category}
    </label>
  )

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {category}
      <SlArrowDown />
      </button>
      { open && subCategories }
    </>
  )
}
export default FilterOptions
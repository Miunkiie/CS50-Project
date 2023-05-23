import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import './filterOptions.css'
import { SlArrowDown } from 'react-icons/sl'


function FilterOptions({ filter, options }) {
  const [open, setOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()

  // Create an array of active filters and set search params to that.
  const updateFilters = (e) => {
    const {value, checked, name} = e.target
    const filterCategory = activeFilters[name]

    // Check if filter is already in array or not.
    if (checked) {
      // Add the filter if it doesn't exist in the array of active filters
      if (!filterCategory) {
        setActiveFilters(prevState => ({
          ...prevState,
          [name]: [value.toLowerCase()]
        }))
      } else {
        filterCategory.push(value.toLowerCase())
      }

    } else {
      // find the index of the existing array then remove it
      const index = filterCategory.indexOf(value.toLowerCase())
      if (index > -1) {
        filterCategory.splice(index, 1)
      }

      // Remove category if there are no options selected for it
      if (filterCategory.length === 0) {
        delete activeFilters[name]
      }
    }
  }

  const filterOptions = options.map(option =>
    <label className="form-control" key={option}> 
      <input type="checkbox" name={filter.toLowerCase()} onClick={updateFilters} value={option} />
      {option}
    </label>
  )

  // useEffect(() => {
  //   console.log(activeFilters)
  // }, [activeFilters, updateFilters])

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {filter}
      <SlArrowDown />
      </button>
      { open && filterOptions }
    </>
  )
}
export default FilterOptions
import { useState } from 'react'

import './filterOptions.css'
import { SlArrowDown } from 'react-icons/sl'

function FilterOptions({ filters, setFilters, filterHeading, options }) {
  const [open, setOpen] = useState(false)

  // Create an array of active filters and set search params to that.
  const updateFilters = (e) => {
    const {value, checked, name} = e.target
    const selectedFilter = filters[name]

    // Check if filter is already in array or not.
    if (checked) {
      // Add the filter if it doesn't exist in the array of active filters
      if (!selectedFilter) {
        setFilters(prevState => ({
          ...prevState,
          [name]: [value.toLowerCase()]
        }))

      } else {
        setFilters(prevState => ({
          ...prevState,
          [name]: [...prevState[name], value.toLowerCase()]
        }))
      }
    } else {
      // find the index of the filter from the existing array filter it out - cannot MUTATE STATE
      const index = selectedFilter.indexOf(value.toLowerCase())
      if (index > -1) {
        // If last filter, remove the whole category from filter
        if (selectedFilter.length === 1) {
          const {[name]: tmp, ...currentFilters} = filters
          setFilters(currentFilters)

        } else {
          setFilters(prevState => ({
            ...prevState,
            [name]: prevState[name].filter((_, i) => i !== index)
          }))
        }
      }
    }  
  }

  const filterOptions = options.map(option =>
    <label className="form-control" key={option}> 
      <input type="checkbox" name={filterHeading.toLowerCase()} onClick={updateFilters} value={option} />
      {option}
    </label>
  )

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {filterHeading}
      <SlArrowDown />
      </button>
      {filterOptions}
    </>
  )
}
export default FilterOptions
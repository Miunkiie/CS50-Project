import { Link, useSearchParams } from 'react-router-dom'
import { useState, useRef } from 'react'

import { SlArrowDown } from 'react-icons/sl'

import './CollapsibleBar.css'

function CollapsibleBar({categories, subCategory}) {
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("query"))

  const toggle = useRef(null)    

  const onClick = (e) => {
    setSearchParams({query})
  }


  const items = subCategory.map(item => 
    <Link onClick={setQuery} key={item} value={item}>
      {item}
    </Link>
  )
  
  return (
    <div className='collapsible-bar'>
        <button ref={toggle} onClick={() => setOpen(!open)}>
          {categories}
          <SlArrowDown />
        </button>
        {open && items}
    </div>
  )
}
export default CollapsibleBar
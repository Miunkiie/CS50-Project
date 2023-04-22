import { useState, useRef, useEffect } from 'react'
import { useSearchParams} from 'react-router-dom'

import { SlArrowDown } from 'react-icons/sl'
import "./sortBy.css"

function SortBy({setSort}) {
  const [open, setOpen] = useState(false)
  const dropDownRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get("sort")

  useEffect(() => {
      setSort(sort)
  }, [setSort, sort])
  
  const onClick = () => {
    setOpen(!open)
  }
  
  const outsideClicks = (e) => {
    if (open && dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setOpen(false)
    }
  }

  const setSortUrl = (e) => {
    setSearchParams({"sort": e.target.dataset.sort})
  }

  document.addEventListener("click", outsideClicks)

  return (
    <div className="sort-by-bar" onClick={onClick} ref={dropDownRef}>
      Sort by 
      <SlArrowDown />
      {open && <ul onClick={setSortUrl}>
        <li data-sort="priceDesc">
          Price: High-Low
        </li>
        <li data-sort="priceAsc">
          Price: Low-High
        </li>
        <li data-sort="ratingDesc">
          Rating: High-Low
        </li>
        <li data-sort="ratingAsc">
          Rating: Low-High
        </li>
      </ul>
      }
    </div>
  )
}
export default SortBy
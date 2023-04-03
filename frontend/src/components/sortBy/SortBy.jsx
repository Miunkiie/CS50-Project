import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProducts } from "../../features/product/productSlice"


import { SlArrowDown } from 'react-icons/sl'
import "./sortBy.css"

function SortBy({gender, category}) {
  const [open, setOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const dropDownRef = useRef(null)
  
  const sort = searchParams.get("sort")
  
  const {product, isError, message } = useSelector(state => state.product)
  const dispatch = useDispatch()
  let filters = {
    gender, 
    category, 
    sort
  }

  useEffect(() => {
    dispatch(getProducts(filters))
    
    if (isError) {
      toast.error(message)
    }
  }, [dispatch, isError, message, filters])


  const onClick = () => {
    setOpen(!open)
  }

  const outsideClicks = (e) => {
    if (open && dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setOpen(false)
    }
  }

  document.addEventListener("click", outsideClicks)

  return (
    <div className="sort-by-bar" onClick={onClick} ref={dropDownRef}>
      Sort by 
      < SlArrowDown />
      {open && <ul>
        <li>
          <Link to={{
            pathname: `/collections/${gender}`,
            search: "?sort=priceDesc"
          }}
          >
          Price: High-Low
          </Link>
        </li>
        <li>
          <Link to={{
            pathname: `/collections/${gender}`,
            search: "?sort=priceAsc"
          }}
          >
          Price: Low-High
          </Link>
        </li>
        <li data-sort="ratingDesc">Rating: High-Low</li>
        <li data-sort="ratingAsc">Rating: Low-High</li>
      </ul> }
    </div>
  )
}
export default SortBy
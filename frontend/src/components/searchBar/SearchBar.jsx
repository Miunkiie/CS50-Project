import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProducts } from '../../features/product/productSlice'

import './searchBar.css'

function SearchBar() {
  const [ query, setQuery ] = useSearchParams()
  const navigate = useNavigate()
  const {pathname, search} = useLocation()
  const searchedQuery = useRef(null)
  const dispatch = useDispatch()
  const { isSuccess, isError, message } = useSelector(state => state.product)

  // React component not rendering when a query is searched.
  // Might have to refactor CollectionOverview into smaller components, i.e, rendered categories etc..
  const submit = e => {
    e.preventDefault()

    setQuery({"q": searchedQuery.current.value})
    
    navigate({
      pathname: "collections/search",
      search: `q=${searchedQuery.current.value}`
    })
  }

  useEffect(() => {
    dispatch(getProducts(query))

    if (isError) {
      toast.error(message)
    }

  }, [isSuccess, isError, message, navigate, dispatch, query])

  return (
        <div className="search-bar">
          <form className="search-form" onSubmit={submit}>
            <input type="text" placeholder="Search products" ref={searchedQuery} />
          </form>
        </div>
  )
}
export default SearchBar
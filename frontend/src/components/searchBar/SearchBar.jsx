import { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getProducts } from "../../features/product/productSlice"

import './searchBar.css'

function SearchBar() {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchedQuery = useRef(null)

  // React component not rendering when a query is searched.
  // Might have to refactor CollectionOverview into smaller components, i.e, rendered categories etc..
  const submit = e => {
    e.preventDefault()
    
    dispatch(getProducts({q: searchedQuery.current.value || {}}))

    setSearchParams({"q": searchedQuery.current.value})
    
    navigate({
      pathname: "collections/search",
      search: `q=${searchedQuery.current.value}`
    })
  }

  return (
        <div className="search-bar">
          <form className="search-form" onSubmit={submit}>
            <input type="text" placeholder="Search products" ref={searchedQuery} />
          </form>
        </div>
  )
}
export default SearchBar
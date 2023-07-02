import { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getCollections } from "../../features/product/productSlice"

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

    const query = searchedQuery.current.value
    
    dispatch(getCollections({q: query || {}}))

    setSearchParams({"q": query})
    
    navigate({
      pathname: "collections/search",
      search: `q=${searchedQuery.current.value}`
    })

    window.location.reload()
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
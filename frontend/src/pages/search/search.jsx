import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

import categories from "../../assets/categories/categories"
import CollectionOverview from "../../components/collectionOverview/CollectionOverview"

function Search() {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const query = searchParams.get("q")
  const [ filters, setFilters ] = useState({
    q: query
  })

  // Combined categories both genders 
  const combinedCategories = Object.entries({...categories["men"], ...categories["women"]})
  
  return (
    <CollectionOverview categories={combinedCategories} filters={filters} setFilters={setFilters} />
  )
}
export default Search
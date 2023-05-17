import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

import categories from "../../assets/categories/categories"
import CollectionOverview from "../../components/collectionOverview/CollectionOverview"
import FilterOptions from '../../components/filterOptions/FilterOptions'

function Search() {
  const [ searchParams ] = useSearchParams()
  const query = searchParams.get("q")
  const [ filters, setFilters ] = useState({
    q: query
  })
  
  // Combined categories both genders 
  const combinedCategories = Object.entries({...categories["men"], ...categories["women"]})

  const renderedFilters = combinedCategories.map(([key, value]) => 
      <FilterOptions key={key} category={key} subCategory={value} setFilters={setFilters} />
  )
  
  return (
    <CollectionOverview categories={renderedFilters} 
    filters={filters} setFilters={setFilters} />
  )
}
export default Search
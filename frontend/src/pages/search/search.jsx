import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import filterOptions from "../../assets/filters/filterOptions"
import CollectionOverview from "../../components/collectionOverview/CollectionOverview"
import FilterOptions from '../../components/filterOptions/FilterOptions'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const [filters, setFilters] = useState({
    q: query
  })

  const renderedFilters = Object.entries(filterOptions).map(([key, value]) => 
      <FilterOptions key={key} filter={key} options={value} setFilters={setFilters} />
  )

  useEffect(() => {
    
  }, [filters])

  return (
    <CollectionOverview categories={renderedFilters} 
    filters={filters} setFilters={setFilters} heading="Filters" />
  )
}
export default Search
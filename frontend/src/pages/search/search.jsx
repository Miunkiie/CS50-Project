import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector }  from 'react-redux'
import { toast } from 'react-toastify'

import filterOptions from "../../assets/filters/filterOptions"
import CollectionOverview from "../../components/collectionOverview/CollectionOverview"
import FilterOptions from '../../components/filterOptions/FilterOptions'
import { getProducts } from "../../features/product/productSlice"

function Search() {
  const dispatch = useDispatch()
  const { isError, message } = useSelector(state => state.product)
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const [filters, setFilters] = useState({
    q: query
  })

  const renderedFilters = Object.entries(filterOptions).map(([key, value]) => 
    <FilterOptions 
    key={key}
    filterHeading={key}
    options={value}
    setFilters={setFilters}
    filters={filters} />
  )

  useEffect(() => {
    dispatch(getProducts(filters))

    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch, filters])

  return (
    <CollectionOverview categories={renderedFilters} 
    filters={filters} setFilters={setFilters} heading="Filters" />
  )
}
export default Search
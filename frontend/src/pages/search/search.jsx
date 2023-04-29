import { useSearchParams } from 'react-router-dom'

import categories from "../../assets/categories/categories"
import CollectionOverview from "../../components/collectionOverview/CollectionOverview"

function Search() {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const query = searchParams.get("q")

  
  // Combined categories both genders 
  const combinedCategories = Object.entries({...categories["men"], ...categories["women"]})

  const filters = {
    q: query
  }
  
  return (
    <CollectionOverview categories={combinedCategories} filters={filters} />
  )
}
export default Search
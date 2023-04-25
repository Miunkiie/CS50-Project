import { useParams } from 'react-router-dom'
import { useState } from 'react'

import CollectionOverview from "../../components/collectionOverview/CollectionOverview"
import categories from '../../assets/categories/categories'

function Collections() {
    // Retrieve path params to each collectionOverview
    const {gender, category} = useParams();

    const [filters, setFilters] = useState({
    gender: gender || "",
    category: category || "",
  })

  const categoryMap = Object.entries(categories[gender])

  return (
    <CollectionOverview setFilters={setFilters}
    filters={filters} categories={categoryMap} title={gender} />
  )
}

export default Collections
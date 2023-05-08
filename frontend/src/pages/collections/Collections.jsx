import { useParams } from 'react-router-dom'
import { useState } from 'react'

import CollectionOverview from "../../components/collectionOverview/CollectionOverview"
import SideBarLink from '../../components/sideBarLink/SideBarLink'
import categories from '../../assets/categories/categories'

function Collections() {
    // Retrieve path params to each collectionOverview
    const {gender, category} = useParams();

    const [filters, setFilters] = useState({
    gender: gender || "",
    category: category || "",
  })
  
  // Renders categories
  const renderedCategories = Object.entries(categories[gender]).map(([key, value]) => 
      <SideBarLink key={key} category={key} subCategory={value} setCategory={setFilters} />
  )

  return (
    <CollectionOverview filters={filters} setFilters={setFilters} 
    categories={renderedCategories} title={gender} />
  )
}

export default Collections
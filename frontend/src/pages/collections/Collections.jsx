import { useParams } from 'react-router-dom'

import CollectionOverview from "../../components/collectionOverview/CollectionOverview"
import categories from '../../assets/categories/categories'

function Collections() {
    // Retrieve path params to each collectionOverview
    const {gender, category} = useParams();

    const filters = {
    gender: gender || "",
    category: category || "",
  }

  const categoryMap = Object.entries(categories[gender])

  return (
    <CollectionOverview filters={filters} categories={categoryMap} title={gender} />
  )
}

export default Collections
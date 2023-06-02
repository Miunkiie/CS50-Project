import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector }  from 'react-redux'
import { toast } from 'react-toastify'

import CollectionOverview from "../../components/collectionOverview/CollectionOverview"
import SideBarLink from '../../components/sideBarLink/SideBarLink'
import categories from '../../assets/categories/categories'
import { getProducts } from "../../features/product/productSlice"

function Collections() {
    // Retrieve path params to each collectionOverview
    const dispatch = useDispatch()
    const { isError, message } = useSelector(state => state.product)

    const {gender, category} = useParams();

    const [filters, setFilters] = useState({
    gender: gender || "",
    category: category || "",
  })

  useEffect(() => {
    dispatch(getProducts(filters))
    
    if (isError) {
      toast.error(message)
    }
  }, [dispatch, isError, message, filters])
  
  // Renders categories
  const renderedCategories = Object.entries(categories[gender]).map(([key, value]) => 
      <SideBarLink key={key} category={key} subCategory={value} setCategory={setFilters} />
  )

  return (
    <CollectionOverview filters={filters} setFilters={setFilters} 
    categories={renderedCategories} title={gender} heading="Categories" />
  )
}

export default Collections
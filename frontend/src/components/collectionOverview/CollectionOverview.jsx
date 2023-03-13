import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import categories from '../../assets/categories/categories'

import { getProducts } from "../../features/product/productSlice"
import CollectionItem from "../../components/collectionItem/CollectionItem"
import Sidebar from "../sidebar/Sidebar"
import CollapsibleBar from "../../components/collapsibleBar/CollapsibleBar"

import './CollectionOverview.css'

function CollectionOverview() {
  // Retrieves the gender param
  const {gender} = useParams();

  const { product, isError, message } = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(gender))
    
    if (isError) {
      toast.error(message)
    }
  }, [dispatch, isError, message, gender])

  // Renders all products from that category
  const renderedCollection = product.map(item =>
    <CollectionItem key={item.id} item={item} href="" />
  )
  
  // Renders item types specific to the gender
  const renderedCategories = Object.entries(categories[gender]).map(([key, value]) => 
    <CollapsibleBar key={key} categories={key} subCategory={value} />
  )

  return (
    <div className="collection-container">
      <section className="heading">
        <h1>
          {gender}
        </h1>
      </section>
      <Sidebar>
        {renderedCategories}
      </Sidebar>
      <div className="item-grid">
        {renderedCollection}
      </div>
    </div>
  )
}
export default CollectionOverview
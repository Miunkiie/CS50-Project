import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getProducts } from "../../features/product/productSlice"
import CollectionItem from "../../components/collectionItem/CollectionItem"
import Sidebar from "../sidebar/Sidebar"
import SortBy from '../sortBy/SortBy'
import CollapsibleBar from "../../components/collapsibleBar/CollapsibleBar"

import './collectionOverview.css'

function CollectionOverview({filters, setFilters, categories, title}) {
  const { product, isError, message } = useSelector(state => state.product)
  const { pathname } = useLocation()

  const dispatch = useDispatch()

  const setSort = useCallback((sort) => {
    setFilters(prevState => ({
      ...prevState,
      sort: sort
    }))
  }, [setFilters])

  useEffect(() => {
    dispatch(getProducts(filters))
    
    if (isError) {
      toast.error(message)
    }
  }, [dispatch, isError, message, setFilters, pathname])

  // Renders all products from that category
  const renderedCollection = product.map(item =>
    <CollectionItem key={item.id} item={item} href="" />
  )
  
  // Renders item types specific to the gender
  const renderedCategories = categories.map(([key, value]) => 
    <CollapsibleBar key={key} categories={key} subCategory={value} />
  )

  return (
    <div className="collection-container">
      <section className="heading">
        <h1>
          {title}
        </h1>
      </section>
      <SortBy setSort={setSort} />
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
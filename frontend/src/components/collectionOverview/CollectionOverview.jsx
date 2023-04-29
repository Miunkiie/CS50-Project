import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

import { getProducts } from "../../features/product/productSlice"
import CollectionItem from "../../components/collectionItem/CollectionItem"
import Sidebar from "../sidebar/Sidebar"
import SortBy from '../sortBy/SortBy'
import CollapsibleBar from "../../components/collapsibleBar/CollapsibleBar"

import './collectionOverview.css'

function CollectionOverview({filters, categories, title}) {
  const { product, isError, message } = useSelector(state => state.product)
  const [ filter, setFilters ] = useState(filters)
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  // Renders all products from that category
  const renderedCollection = product.map(item =>
    <CollectionItem key={item.id} item={item} href="" />
  )
  
  // Renders categories
  const renderedCategories = categories.map(([key, value]) => 
    <CollapsibleBar key={key} categories={key} subCategory={value} setCategory={setFilters} />
  )

  const setSort = useCallback(sort => {
    setFilters(prevState => ({
      ...prevState,
      sort: sort
    }))
  }, [setFilters])


  useEffect(() => {
    dispatch(getProducts(filter))
    
    if (isError) {
      toast.error(message)
    }
  }, [dispatch, isError, message, filter, pathname])

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
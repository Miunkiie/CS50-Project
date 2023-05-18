import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'

import { getProducts } from "../../features/product/productSlice"
import CollectionItem from "../../components/collectionItem/CollectionItem"
import CollapsibleBar from '../collapsibleBar/CollapsibleBar'
import Sidebar from "../sidebar/Sidebar"
import SortBy from '../sortBy/SortBy'

import './collectionOverview.css'

function CollectionOverview({filters, setFilters, categories, title, heading}) {
  const { product, isError, message } = useSelector(state => state.product)
  const dispatch = useDispatch()

  // Renders all products from that category
  const renderedCollection = product.map(item =>
    <CollectionItem key={item.id} item={item} href="" />
  )

  const setSort = useCallback(sort => {
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
  }, [dispatch, isError, message, filters])

  return (
    <div className="collection-container">
      <section className="heading">
        <h1>
          {title}
        </h1>
      </section>
      <SortBy setSort={setSort} />
      <Sidebar heading={heading}>
        <CollapsibleBar>
          {categories}
        </CollapsibleBar>
      </Sidebar>
      <div className="item-grid">
        {renderedCollection}
      </div>
    </div>
  )
}
export default CollectionOverview
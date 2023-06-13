import { useSelector } from 'react-redux'
import { useCallback } from 'react'

import CollectionItem from "../../components/collectionItem/CollectionItem"
import CollapsibleBar from '../collapsibleBar/CollapsibleBar'
import Sidebar from "../sidebar/Sidebar"
import SortBy from '../sortBy/SortBy'

import './collectionOverview.css'

function CollectionOverview({setFilters, categories, title, heading}) {
  const { product } = useSelector(state => state.product)

  // Renders all products from that category
  const renderedCollection = product.map(item =>
    <CollectionItem key={item.id} item={item} href="" />
  )

  const setSort = useCallback(sort => {
    setFilters(prevState => ({
      ...prevState,
      sort: sort || ""
    }))
  }, [setFilters])

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
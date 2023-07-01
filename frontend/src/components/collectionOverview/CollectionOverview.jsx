import { useSelector } from 'react-redux' 

import CollectionItem from "../../components/collectionItem/CollectionItem"
import CollapsibleBar from '../collapsibleBar/CollapsibleBar'
import Sidebar from "../sidebar/Sidebar"
import SortBy from '../sortBy/SortBy'

import './collectionOverview.css'

function CollectionOverview({setFilters, categories, title, heading}) {
  const { product } = useSelector(state => state.product)

  // Renders all products from that category
  const renderedCollection = product.map(item =>
    <CollectionItem key={item.id} item={item} href={`/product/${item.name.replace(/\s+/g, '-').toLowerCase()}`} />
  )

  return (
    <div className="collection-container">
      <section className="heading">
        <h1>
          {title}
        </h1>
      </section>
      <SortBy setFilters={setFilters} />
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
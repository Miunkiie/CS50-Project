import { useSelector } from 'react-redux' 

import ProductCard from '../productCard/ProductCard'
import CollapsibleBar from '../collapsibleBar/CollapsibleBar'
import Sidebar from "../sidebar/Sidebar"
import SortBy from '../sortBy/SortBy'

import './collectionOverview.css'

function CollectionOverview({setFilters, categories, title, heading}) {
  const { product } = useSelector(state => state.product)

  // Renders all products from that category
  const renderedCollection = product.map(item =>
    <ProductCard key={item.id} item={item}>
      <div className="item-footer">
        <h3>{item.name}</h3>
        <h4>${item.price}</h4>
      </div>
    </ProductCard>
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
      <div className="collection-overview">
        {renderedCollection}
      </div>
    </div>
  )
}
export default CollectionOverview
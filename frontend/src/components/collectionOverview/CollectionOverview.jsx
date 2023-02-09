import CollectionItem from "../collectionItem/CollectionItem"
import placeholder from '../../assets/images/placeholder.jpg'

import './collectionOverview.css'

function CollectionOverview() {
  return (
    <div className="collection-container">
      <CollectionItem img={placeholder} alt="placeholder" description="black shirt" price="$5.00"/>
    </div>
  )
}
export default CollectionOverview
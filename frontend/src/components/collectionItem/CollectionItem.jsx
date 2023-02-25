import './collectionItem.css'

import placeholder from '../../assets/images/placeholder.jpg'

function CollectionItem({item, href}) {
  const { image, name, price } = item
  return (
    <div className="collection-item">
      <a href={href}>
        <div className="item-image">
            <img src={placeholder} alt={name} />
        </div>
        <div className="item-footer">
          <h3>{name}</h3>
          <h4>${price}</h4>
        </div>
      </a>
    </div>
  )
}
export default CollectionItem
import './collectionItem.css'

function CollectionItem({item, alt}) {
  const {images, description, price} = item
  return (
    <div className="collection-item">
        <div className="item-image">
            <img src={images} alt={alt} />
            <div className="item-footer">
              <h3>{description}</h3>
              <h4>{price}</h4>
            </div>
        </div>
    </div>
  )
}
export default CollectionItem
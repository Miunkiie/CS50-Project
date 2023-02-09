import './collectionItem.css'

function CollectionItem({img, alt, description, price}) {
  return (
    <div className="collection-item">
        <div className="item-image">
            <img src={img} alt={alt} />
            <div className="item-footer">
              <h3>{description}</h3>
              <h4>{price}</h4>
            </div>
        </div>
    </div>
  )
}
export default CollectionItem
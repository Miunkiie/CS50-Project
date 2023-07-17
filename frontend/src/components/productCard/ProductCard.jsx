import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getProduct } from '../../features/product/productSlice'

function ProductCard({children, item}) {
    const {image, description, id, name } = item
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Retrieve selected product 
    const retrieveProduct = (e) => {
        dispatch(getProduct(e.target.dataset.id))

        navigate(`product/${e.target.dataset.name.replace(/\s+/g, '-').toLowerCase()}`)
    }

  return (
    <div className="product-card" onClick={retrieveProduct}>
        <div className="item-image">
            <img src={image} alt={description}
            data-id={id} data-name={name} />
        </div>
        {children}
    </div>
  )
}
export default ProductCard
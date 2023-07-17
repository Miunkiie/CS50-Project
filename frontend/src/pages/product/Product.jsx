import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import StarRatings from "../../components/starRatings/StarRatings"
import ImagePreview from '../../components/imagePreview/ImagePreview'

import './product.css'

function Product() {
  const {product, isError, message} = useSelector(state => state.product)

  const renderedImages = product["images"]?.map((value, index) => 
    <img key={index} src={value} alt={product['description']} />
  )

  // Function to capitalize first character of each word
  // ^\w : first character of the string
  // | : or
  // \s\w : first character after whitespace
  // (^\w|\s\w) Capture the pattern.
  // g Flag: Match all occurrences.
  function capitalizeLetter(text) {
    return text?.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

  }, [isError, message])

  return (
    <div className="product-container">
        breadcrumbs
        <div className="content-card">
          <ImagePreview images={renderedImages} />
          <section className="info-container">
            <div className="product-details">
              <header className="product-title">
                <h1>{capitalizeLetter(product.name)}</h1>
              </header>
              <div className="span-separation">
                <div className="ls">
                  <span className="product-price">
                    {`$${product.price}.00`}
                  </span>
                </div>
                <div className="rs">
                  <StarRatings />
                  <span className="num-reviews">
                    <a href='/'>
                      {`(${product.numOfReviews})`}
                    </a>
                  </span>
                </div>
              </div>
              <p className='product-description'>
                {product.description}
              </p>
            </div>
          </section>

        </div>
    </div>
  )
}
export default Product
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { toast } from 'react-toastify'

import Slider from "react-slick"
import StarRatings from "../../components/starRatings/StarRatings"

import './product.css'

function Product() {
  const {product, isError, message} = useSelector(state => state.product)

  const thumbnailSlider = useRef(null)
  const mainImageSlider = useRef(null)

  const thumbailSettings = {
    arrows: false,
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    vertical: true,
    verticalSwiping: true,
    asNavFor: mainImageSlider.current
  }

  const mainImageSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: thumbnailSlider.current
  }

  const renderedImages = product["images"]?.map((value, index) => 
    <img key={index} src={value} alt={product['description']} />
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

  }, [isError, message])

  return (
    <div className="product-container">
        breadcrumbs
        <div className="content-card">
          <section className="product-image-section">
            <div className="thumbnail-section">
              <Slider {...thumbailSettings} ref={thumbnailSlider}>
                {renderedImages}
              </Slider>
            </div>
            <div className="main-image">
              <Slider {...mainImageSettings} ref={mainImageSlider}>
                {renderedImages}
              </Slider>
            </div>
          </section>
          <section className="info-container">
            <div className="product-details">
              <header className="product-title">
                <h1>{product.name}</h1>
              </header>
              <p className='product-description'>{product.description}</p>
              <div className="span-separation">
                <span className="product-price">{`$${product.price}.00`}</span>
                <StarRatings />
              </div>
            </div>
          </section>
        </div>
    </div>
  )
}
export default Product
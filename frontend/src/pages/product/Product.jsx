import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'

import Slider from "react-slick"
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

  return (
    <div className="product-container">
        breadcrumbs
        <div className="content-card">
          <div className="product-image-section">
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
          </div>
          <div className="info-container">
            Info section
          </div>
        </div>
    </div>
  )
}
export default Product
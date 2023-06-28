import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { newArrivals } from '../../features/product/productSlice'

import Slider from "react-slick"
import Thumbnail from '../../components/thumbnail/Thumbnail'
import './product.css'

function Product() {
  const {product, isError, message} = useSelector(state => state.product)
  const dispatch = useDispatch()

  const thumbnailSlider = useRef(null)
  const mainImageSlider = useRef(null)

  useEffect(() => {
    dispatch(newArrivals())
  }, [dispatch])

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

  const renderedThumbnail = product.map(item => 
    <Thumbnail item={item} key={item.id} />
  )

    const renderedImage = product.map(item => 
    <Thumbnail item={item} key={item.id} />
  )

  return (
    <div className="product-container">
        breadcrumbs
        <div className="content-card">
          <div className="product-image-section">
            <div className="thumbnail-section">
              <Slider {...thumbailSettings} ref={thumbnailSlider}>
                {renderedThumbnail}
              </Slider>
            </div>
            <div className="main-image">
              <Slider {...mainImageSettings} ref={mainImageSlider}>
                {renderedImage}
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
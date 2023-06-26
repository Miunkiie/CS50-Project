import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { newArrivals } from '../../features/product/productSlice'

import Carousel from "../../components/carousel/Carousel"
import CarouselItem from '../../components/carousel/CarouselItem'
import Thumbnail from '../../components/thumbnail/Thumbnail'
import './product.css'

function Product() {
  const {product, isError, message} = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newArrivals())
  }, [dispatch])

  const thumbailSettings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    vertical: true,
    verticalSwiping: true,
  }

  const mainImageSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const renderedThumbnail = product.map(item => 
    <Thumbnail role="button" key={item.id} item={item} />
  )

    const renderedCarousel = product.map(item => 
    <CarouselItem key={item.id} item={item} />
  )

  // useEffect to detect when a thumbnail is clicked then transfer it to the main image

  return (
    <div className="product-container">
        breadcrumbs
        <div className="content-card">
          <div className="product-image-section">
            <div className="thumbnail-section">
              <Carousel settings={thumbailSettings}>
                {renderedThumbnail}
              </Carousel>
            </div>
            <div className="main-image">
              <Carousel settings={mainImageSettings}>
                {renderedCarousel}
              </Carousel>
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
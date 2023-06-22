import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { newArrivals } from '../../features/product/productSlice'

import Carousel from "../../components/carousel/Carousel"
import CarouselItem from '../../components/carousel/CarouselItem'
import './product.css'

function Product() {
  const {product, isError, message} = useSelector(state => state.product)
  const dispatch = useDispatch()

  console.log(product)

  useEffect(() => {
    dispatch(newArrivals())
  }, [dispatch])

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    vertical: true,
    verticalSwiping: true,
  }

  const renderedCarousel = product.map(item => 
    <CarouselItem key={item.id} item={item} />
  )

  return (
    <div className="product-container">
        breadcrumbs
        <div className="content-card">
          <div className="product-image-section">
            <div className="thumbnail-section">
              <Carousel settings={settings}>
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
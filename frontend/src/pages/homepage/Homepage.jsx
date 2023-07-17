import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Slider from "react-slick"
import { newArrivals } from '../../features/product/productSlice'

import clearanceBanner from "../../assets/images/ClearanceBanner.png"
import { RxDividerHorizontal } from "react-icons/rx"
import Banner from "../../components/banner/Banner"
import ProductCard from '../../components/productCard/ProductCard'

import './homepage.css'

function Homepage() {
  const dispatch = useDispatch()
  const { product, isError, message } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(newArrivals())

    if (isError) {
      toast.error(message)
    }

  }, [dispatch, isError, message])

  // Settings for the carousel
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  const renderedCarousel = product.map(item =>
    <ProductCard key={item.id} item={item} />
  )

  return (
    <div>
      <Banner>
        <b>Free shipping for orders above $49.99!! Australia only!!</b>
        <b>International Shipping</b>
      </Banner>
      <div className="homepage-container">
        <img src={clearanceBanner} alt="Huge Clearance Sale" className="hero-banner" />
        <section className="heading">
          <h2 className="section-heading">
            <RxDividerHorizontal className="section-divider" />
            New Arrivals
            <RxDividerHorizontal className="section-divider"/>
          </h2>
        </section>
        <Slider {...settings} className="homepage-carousel">
          {renderedCarousel}
        </Slider>
      </div>
    </div>
  )
}
export default Homepage
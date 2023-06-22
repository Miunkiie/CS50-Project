import {useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { newArrivals } from '../../features/product/productSlice'
import { toast } from 'react-toastify'

import clearanceBanner from "../../assets/images/ClearanceBanner.png"
import Carousel from "../../components/carousel/Carousel"
import CarouselItem from '../../components/carousel/CarouselItem'
import { RxDividerHorizontal } from "react-icons/rx"
import Banner from "../../components/banner/Banner"

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
  <CarouselItem key={item.id} item={item} />)

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
        <Carousel settings={settings}>
          {renderedCarousel}
        </Carousel>
      </div>
    </div>
  )
}
export default Homepage
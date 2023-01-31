import clearanceBanner from "../assets/images/ClearanceBanner.png"
import Carousel from "../components/carousel/Carousel"
import CarouselItem from '../components/carousel/CarouselItem'
import { RxDividerHorizontal } from "react-icons/rx"
import placeholder from '../assets/images/placeholder.jpg'
import Banner from "../components/banner/Banner"

function Homepage() {
  return (
    <div>
      <Banner>
        <b>Free shipping for orders above $49.99!! Australia only!!</b>
        <b>International Shipping</b>
      </Banner>
      <div className="container">
        <img src={clearanceBanner} alt="Huge Clearance Sale" className="hero-banner" />
        <section className="heading">
          <h2 className="section-heading">
            <RxDividerHorizontal className="section-divider" />
            New Arrivals
            <RxDividerHorizontal className="section-divider"/>
          </h2>
        </section>
        <Carousel>
          <CarouselItem image={placeholder} alt={""} />
          <CarouselItem image={placeholder} alt={""} />
          <CarouselItem image={placeholder} alt={""} />
          <CarouselItem image={placeholder} alt={""} />
          <CarouselItem image={placeholder} alt={""} />
          <CarouselItem image={placeholder} alt={""} />
          <CarouselItem image={placeholder} alt={""} />
        </Carousel>
      </div>
    </div>
  )
}
export default Homepage
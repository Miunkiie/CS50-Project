import clearanceBanner from "../assets/images/ClearanceBanner.png"
import Carousel from "../components/carousel/Carousel"
import CarouselItem from "../components/carousel/CarouselItem"
import { RxDividerHorizontal } from "react-icons/rx"

function Homepage() {
  return (
    <div className="container">
      <img src={clearanceBanner} alt="Huge Clearance Sale" className="hero-banner" />
      <section className="heading">
        <h2 className="section-heading">
          <RxDividerHorizontal className="section-divider" />
          New Arrivals
          <RxDividerHorizontal className="section-divider"/>
        </h2>
        <Carousel>
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
          <CarouselItem>Item 4</CarouselItem>
        </Carousel>
      </section>
      </div>
  )
}
export default Homepage
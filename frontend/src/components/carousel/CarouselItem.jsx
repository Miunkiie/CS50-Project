import './carousel.css'

function CarouselItem(props) {
  return (
    <div className="carousel-item">
        {props.children}
    </div>
  )
}
export default CarouselItem
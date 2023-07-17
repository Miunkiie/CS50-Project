import Slider from "react-slick"
import { useRef } from "react"

import './imagePreview.css'

function ImagePreview({images}) {

  const thumbnailSlider = useRef(null)
  const mainImageSlider = useRef(null)

  const thumbnailSettings = {
    arrows: false,
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true, 
    vertical: true,
    asNavFor: mainImageSlider.current
  }

  const mainImageSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: thumbnailSlider.current
  }

  return (
    <section className="product-image-section">
        <div className="thumbnail-section">
            <Slider {...thumbnailSettings} ref={thumbnailSlider}>
            {images}
            </Slider>
        </div>
        <div className="main-image">
            <Slider {...mainImageSettings} ref={mainImageSlider}>
            {images}
            </Slider>
        </div>
    </section>
  )
}
export default ImagePreview
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({children, settings}) {
  return (
    <Slider {...settings}>
      {children}                      
    </Slider>
  )
}
export default Carousel
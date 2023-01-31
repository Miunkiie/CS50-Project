import './banner.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner({children}) {
    let settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7500,
  };

  return (
    <div className="banner">
        <Slider {...settings}>
            {children}
        </Slider>
    </div>
  )
}
export default Banner
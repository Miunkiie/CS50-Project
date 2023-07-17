import { useSelector } from 'react-redux'

import { BsStarFill } from 'react-icons/bs'

import './starRatings.css'

function StarRatings() {
    const {product} = useSelector(state => state.product)

    // Generate 5 empty stars
    const starRatings = [...Array(5)].map((star, index) => {
      index += 1;

      return (
        <button type="button" key={index} className={index <= product.rating ? "on" : "off"}>
          <span className="stars"><BsStarFill /></span>
        </button>
      )
    })

  return (
    <span className="star-rating">
        {starRatings}
    </span>
  )
}
export default StarRatings
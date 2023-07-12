import { useState } from 'react'

import { BsStarFill } from 'react-icons/bs'

import './starRatings.css'

function StarRatings() {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    // Generate 5 empty stars
    const starRatings = [...Array(5)].map((star, index) => {
      index += 1;

      return (
        <button type="button" key={index} className={index <= (hover || rating) ? "on" : "off"}
        onClick={() => setRating(index)}
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(rating)}
        >
          <span className="stars"><BsStarFill /></span>
        </button>
      )
    })

  return (
    <div className="star-rating">
        {starRatings}
    </div>
  )
}
export default StarRatings
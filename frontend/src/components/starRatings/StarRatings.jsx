import { useState } from 'react'


function StarRatings() {
    const [rating, setRating] = useState(0)

    // Generate 5 empty stars
    const starRatings = Array(5).map(star => 
        <span className="star-rating">***</span>
    )

  return (
    <div className="star-rating">
        {starRatings}
    </div>
  )
}
export default StarRatings
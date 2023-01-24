import React, { useState } from 'react'

import './carousel.css'

function Carousel(props) {
  // Function to change the view of the picture
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (index) => {
    if (index < 0) {
      index = 0
    } else if (index >= React.Children.count(props.children)) {
      index = 0
    }

    setActiveIndex(index)
  }
  
  return (
    <div className="carousel">
      <div className="inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
        {React.Children.map(props.children, (child, index) => {
          return React.cloneElement(child)
        })}
      </div>
      <div className="indicators">
        <button onClick={() => {updateIndex(activeIndex - 1)}}>
          prev
        </button>
        <button onClick={() => {updateIndex(activeIndex + 1)}}>
          next
        </button>
      </div>
    </div>
  )
}
export default Carousel
import placeholder from '../../assets/images/placeholder.jpg'
import './thumbnail.css'

function Thumbnail({item}) {
  const {description, image} = item
  
  return (
    <button>
        <img src={placeholder} alt={description} />
    </button>
  )
}
export default Thumbnail
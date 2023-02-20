import placeholder from '../../assets/images/placeholder.jpg'

function CarouselItem({item}) {
  const { description, image } = item

  return (
    <a href="">
        <img src={image} alt={description} />
    </a>

  )
}
export default CarouselItem
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProducts } from "../features/product/productSlice"
import CollectionOverview from "../components/collectionOverview/CollectionOverview"
import CollectionItem from "../components/collectionItem/CollectionItem"

function Men() {
  // const [searchParams, setSearchParams] = useSearchParams()
  const { product, isError, message } = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts('men'))
    
  }, [dispatch])

  const renderedCollection = product.map(item =>
    <CollectionItem key={item.id} item={item} href="" />)

  return (
    <div>
      <section className="heading">
        <h1>
          MEN
        </h1>
      </section>
      <CollectionOverview>
        {renderedCollection}
      </CollectionOverview>
    </div>
  )
}
export default Men
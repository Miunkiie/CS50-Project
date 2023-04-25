
import categories from "../../assets/categories/categories"
import CollectionOverview from "../../components/collectionOverview/CollectionOverview"

function search() {
  // Combined categories both genders 
  const combinedCategories = Object.entries({...categories["men"], ...categories["women"]})
  
  return (
    <CollectionOverview categories={combinedCategories} />
  )
}
export default search
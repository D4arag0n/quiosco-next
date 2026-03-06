import AddProductForm from "@/components/product/AddProductForm"
import ProductForm from "@/components/product/ProductForm"
import ProductTable from "@/components/product/ProductsTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"



export default async function page() {
  return (
    <>
      <Heading>
          Registrar Producto
      </Heading>


      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    
    </>
    
  )
}

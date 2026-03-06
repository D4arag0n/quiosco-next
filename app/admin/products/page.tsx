import ProductPagination from '@/components/product/ProductPagination'
import ProductSearchForm from '@/components/product/ProductSearchForm'
import ProductTable from '@/components/product/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function productsCount(){
  const totalProducts = await prisma.product.count()
  return totalProducts
}

async function getProducts(page: number, pageZise: number){
  const skip = (page - 1) * pageZise
  const products = await prisma.product.findMany({
    take: pageZise,
    skip,
    include: {
      category: true
    }
  })

  return products
}

//Creamos un type aqui porque se va a sincronizar con la consulta, el type se le asigna 
//de acuerdo al resultado de la consulta
export type ProductWithCategoryType = Awaited<ReturnType<typeof getProducts>>

export default async function ProductPage({searchParams} : {searchParams: {page: string}}) {

  const page = +searchParams.page || 1
  const pageZise = 10
  if(page < 0) redirect('/admin/products')
  const productsData = getProducts(page, pageZise)
  const totalProductsData = productsCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageZise)

  if(page > totalPages) redirect('/admin/products')
  return (
    <>
      <Heading>
          Administrador de Productos
      </Heading>

      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
        <Link 
          href={`/admin/products/new`}
          className='px-10 py-3 w-full lg:w-auto bg-amber-500 font-bold text-xl text-center'
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable 
        products={products}
      />

      <ProductPagination 
        page={page}
        totalPages={totalPages}
      />
    </>
    
  )
}

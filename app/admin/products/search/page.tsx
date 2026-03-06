import ProductSearchForm from "@/components/product/ProductSearchForm";
import ProductTable from "@/components/product/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerms: string){
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerms,
                mode: 'insensitive'
            }
        },
        include:{
            category: true
        }
    })

    return products
}

export default async function SearchPage({searchParams} : {searchParams: {search: string}}) {
    
    const products = await searchProducts(searchParams.search)
    console.log(products)
  return (
    <>
        <Heading>
            Resultados de Busqueda: {searchParams.search}
        </Heading>

        <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
            <ProductSearchForm />
        </div>

        {products.length ? (
            <ProductTable products={products}/>
        ) : <p className="text-center">No hay resultados</p>}
        
    </>
  )
}

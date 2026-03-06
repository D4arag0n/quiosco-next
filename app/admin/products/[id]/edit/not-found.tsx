import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='text-center'>
        <Heading>Producto no encontrado</Heading>
        <Link
            href={'/admin/products'}
            className='bg-amber-500 text-white px-10 py-3 font-bold w-full md:w-auto text-xl'
        >
        Regresar a Productos
        </Link>
    </div>
  )
}

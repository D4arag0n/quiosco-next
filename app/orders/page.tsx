"use client"
import useSWR from 'swr'
import Logo from '@/components/ui/Logo'
import React from 'react'
import { OrderWithProductsType } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'

export default function page() {

    const url = '/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

  const {data, error, isLoading} = useSWR<OrderWithProductsType[]>(url, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: false
  })
  if(isLoading) return <p>'Cargando...'</p>
  if(data) return (
    <>
        <h1 className='font-black text-4xl text-center mt-10'>Ordenes Listas</h1>
        <Logo />


        {data.length ? (
                <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
                    {data.map(order => (
                        <LatestOrderItem key={order.id} order={order}/>
                    ))}
                    
                </div>
            
        ) : <p>No hay ordenes aun</p>}
    </>
  )
}

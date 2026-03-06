"use client"
import useSWR from 'swr'
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import React from 'react'
import { OrderWithProductsType } from '@/src/types'

/*async function getPendingOrders(){
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts:{
        include:{
          product: true
        }
      }
    }
  })

  return orders
}*/

export default function orderPage() {
  //const orders = await getPendingOrders()
  //console.log(JSON.stringify(orders, null, 2))

  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

  const {data, error, isLoading} = useSWR<OrderWithProductsType[]>(url, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: false
  })

  if(data) return (
   <>
    <Heading>
        Lista de ordenes
    </Heading>

    {data.length ? (
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-10'>
      {data.map(order => (
        <OrderCard order={order}/>
      ))}
    </div>
    ) : <p className='text-center'>No hay ordenes pendientes</p>}
    
   </>
  )
}

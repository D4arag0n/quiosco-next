"use client"
import { useStore } from "@/src/store"
import ProductDetails from "../product/ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.subtotal), 0), [order])
  const emptyOrder = useStore((state) => state.emptyOrder)

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    if(!result.success){
      result.error.issues.map(issue => {
        toast.error(issue.message)
      })

      return
    }

    const response = await createOrder(data)
    if(response?.errors){
      response.errors.map(error => {
        toast.error(error.message)
      })
    }

    toast.success('Orden enviada correctamente')
    emptyOrder()
  }
  return (
    <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl font-bold text-center">Mi Pedido</h1>

        {order.length === 0 ? <p className=" text-center my-10">El carrito está vacio</p> : (
          <div className="mt-5">
            {order.map(item => (
              <ProductDetails key={item.id} item={item}/>
            ))}

            <p className="text-2xl mt-20 text-center">
              Total a pagar: {''}
              <span className="font-bold">{formatCurrency(total)}</span>
            </p>

            <form 
              className="w-full space-y-5 mt-5"
              action={handleCreateOrder}
            >
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  className="bg-white border border-gray-100 p-2 w-full"
                  placeholder="Tu nombre"
                />
                <input 
                  type="submit" 
                  className="py-2 rounded uppercase text-white bg-black w-full 
                  text-center font-bold cursor-pointer hover:bg-slate-900"
                  value="Confirmar pedido" 
                />
            </form>
          </div>
        )}
    </aside>
  )
}

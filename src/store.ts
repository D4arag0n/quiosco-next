import { create } from 'zustand'
import { OrderItemType } from './types'
import { Product } from './generated/prisma/client'

type Store = {
    order: OrderItemType[]
    addToCart: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    deleteItem: (id: Product['id']) => void
    emptyOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {
        const { categoryId, image, ...data } = product

        let order: OrderItemType[] = []

        //Revisamos si existe un elemento igual
        if (get().order.find(item => item.id === product.id)) {
            //Buscamos el elemento a actualizar
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id) => {

        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)


        set(() => ({
            order
        }))
    },
    deleteItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    emptyOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))
import { Order, OrderProducts, Product } from "../generated/prisma/client";

export type OrderItemType = Pick<Product, 'id' | 'name' | 'price'>& {
    quantity: number,
    subtotal: number
}

export type OrderWithProductsType = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}
"use client"
import { Product } from "@/src/generated/prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {
    const addToCart = useStore((store) => store.addToCart)
    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full p-3 mt-5 font-bold text-2xl uppercase"
            onClick={() => addToCart(product)}
        >
            Agregar
        </button>
    )
}

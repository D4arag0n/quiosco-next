"use client"

import { useRouter } from "next/navigation"



export default function GoBackButton() {

    const router = useRouter()
  return (
    <button
        onClick={() => router.back()}
        className='px-10 py-3 w-full lg:w-auto bg-amber-500 font-bold text-xl text-center'
    >
        Regresar
    </button>
  )
}

"use client"
import { SearchSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function ProductSearchForm() {
    const router = useRouter()
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }

        const result = SearchSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })

            return
        }

        router.push(`/admin/products/search?search=${result.data.search}`)

    }
  return (
    <form
        className="flex items-center"
        action={handleSearchForm}
    >
        <input 
            type="text" 
            name="search" 
            placeholder="Buscar Producto"
            className="bg-white p-3 w-full border"
        />
        <input 
            type="submit" 
            value="Buscar" 
            className="p-3 bg-indigo-600 font-bold cursor-pointer text-white"
        />


    </form>
  )
}

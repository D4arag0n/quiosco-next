import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic' //Se agrega para que los endpoints sean dinamicos y no queden cacheados 
//Y puedan actualizar la información

export async function GET(){

    const orders = await prisma.order.findMany({
        where:{
            status: false
        },
        include:{
            orderProducts:{
                include:{
                    product:true
                }
            }
        }
    })

    return Response.json(orders)
}


'use server'

import { getUserToken } from "@/getUserToken"

export async function getWishListUser(){
     const token  = await getUserToken()
    
        if(!token){
    
            throw new Error('Token Requierd')
    
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist` , {
            headers: {
                token : token
            }
        })

        const data = res.json()

        return data

}

export async function addProductToWish(id : string){

     const token  = await getUserToken()
    
        if(!token){
    
            throw new Error('Token Requierd')
    
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist` , {
            headers : {
                token : token ,
                 'content-type' : 'application/json'
            },

            body : JSON.stringify({
                productId : id
            }),

            method : 'post'
        })

        const data = res.json()

        return data


}


export async function deleteProductWish(id: string){

    const token  = await getUserToken()
    
        if(!token){
    
            throw new Error('Token Requierd')
    
        }



        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,{
            headers : {
                token : token
            },

            method : 'delete' ,
        })


        const data = await res.json()

        return data


}
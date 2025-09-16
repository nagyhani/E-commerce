'use server'

import { getUserToken } from "@/getUserToken"
import { decode } from "next-auth/jwt"
import { cookies } from 'next/headers';


export async function paymentSession(id : string , shippingData : {details : string , city : string , phone : string}){

    const token = await getUserToken()

    if(token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${id}?url=${process.env.NEXT_URL}` ,{
            headers : {
                token : token,
                 'content-type' : 'application/json'
            },

            body: JSON.stringify({
                shippingData
            }),

            method : 'post'

        } )

        const data = await res.json()

        return data
    }
}


export async function cashPaymentSession(id : string , shippingData : {details : string , city : string , phone : string}){

    const token = await getUserToken()

    if(token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${id}`,{
            headers : {
                token : token,
                 'content-type' : 'application/json'
            },

            body: JSON.stringify({
                shippingData
            }),

            method : 'post'

        }) 

        const data = await res.json()

        return data
    }

}



export async function ordersReview(){
    const TokenSession = (process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token")
     const token = await getUserToken()
     const cookiesData = await cookies()
     const encryptToken =  cookiesData.get(TokenSession)?.value
 const decryptToken = await  decode({token : encryptToken , secret: process.env.AUTH_SECRET!})


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${decryptToken?.id}`)

    const data = await res.json()

    return data
}
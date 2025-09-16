'use server'

import { getUserToken } from "@/getUserToken";

export async function GetUserCart(){

     const token  = await getUserToken()

    if(!token){

        throw new Error('Token Requierd')

    }
    
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            token: token
        }
    })

       const data = await res.json()

      return data
       
       

}


export async function addProductToCart(id :string){

    const token  = await getUserToken()

    if(!token){

        throw new Error('Token Requierd')

    }

    const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart` , {
        headers :{
            
            token : token ,
            'content-type' : 'application/json'
            
        }
        ,
        method: 'post',

        body:  JSON.stringify({
                 productId : id
            })
        
    })

    const data = (await res).json()

    return data

}



export async function deleteSpecificProduct(id : string){

    const token  = await getUserToken()

    if(!token){

        throw new Error('Token Requierd')

    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}` , {
        method : 'delete',
        headers : {
            token : token
        }
    })


    const data = await res.json()

    return data



}

export async function clearCart(){
     const token  = await getUserToken()

    if(!token){

        throw new Error('Token Requierd')

    }

   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart` , {
        method : 'delete',
        headers : {
            token : token
        }
    })


    const data = await res.json()

    return data


}


export async function updateCountItems( id : string , count : number){

     const token = await getUserToken()

    if(!token){

        throw new Error('Token Requierd')

    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}` ,  {
        headers :{
            
            token : token ,
            'content-type' : 'application/json'
            
        }
        ,
        method: 'put',

        body:  JSON.stringify({
                 count : count
            })
        
    } )


    const data = await res.json()

    return data

}
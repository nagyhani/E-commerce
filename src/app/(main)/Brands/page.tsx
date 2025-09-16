
'use client'

import { Brandss } from '@/types/brands'
import { Brand } from '@/types/cart.type'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Brands() {

    const [brand , setBrand] = useState<Brand[]>([])
    const [loading ,setLoading] = useState(true)

    useEffect(()=>{
        handelBrands()
    },[])



   async function handelBrands(){
    setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`) 

        const data : Brandss = await res.json()
       setBrand(data.data)
        setLoading(false)
        
    } 
  return (
   loading ? (
    
     <div className="flex justify-center">
       <span className="loader my-64"></span>
     </div>
   ) : (

    <>
     <h1 className = "text-main text-2xl text-center my-9 ">All Brands</h1>
     <div className="grid grid-cols-1 lg:grid-cols-4 w-4/6 mx-auto my-5 gap-8">
       {brand.map((item) => (
         <div
           key={item._id}
           className="border rounded-2xl hover:shadow-[0_4px_30px_rgba(16,200,129,0.7)] transition-shadow duration-500 cursor-pointer"
         >
           <div className="h-64 overflow-hidden">
             <Image
               className="rounded-t-2xl w-full h-full object-contain"
               src={item.image as string}
               alt={item.name}
               width={550}
               height={550}
             />
           </div>
 
           <div className="h-28 flex items-center justify-center text-3xl text-green-500">
             {item.name}
           </div>
         </div>
       ))}
     </div>
    </>
   
   )
 )
}

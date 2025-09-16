'use client'

import { Categoriess, Category } from '@/types/categories'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Categories() {

    const [category , setCategory] = useState<Category[]>([])
   const [loading ,setLoading] = useState(true)


    useEffect(()=>{
        handelCategories()
    },[])

   async function handelCategories(){
    setLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)

        const data : Categoriess = await res.json()
       
        setCategory(data.data)
        setLoading(false)

    }
 return (
  loading ? (
    <div className="flex justify-center">
      <span className="loader my-64"></span>
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-4/6 mx-auto my-5 gap-8">
      {category.map((item) => (
        <div
          key={item._id}
          className="border rounded-2xl hover:shadow-[0_4px_30px_rgba(16,200,129,0.7)] transition-shadow duration-500 cursor-pointer"
        >
          <div className="h-64 overflow-hidden">
            <Image
              className="rounded-t-2xl w-full h-full object-cover"
              src={item.image}
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
  )
)
}

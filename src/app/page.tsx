import { Product, products } from '@/types/product. d'
import React, { Suspense} from 'react'
import MainSlider from './(main)/_components/MainSlider/MainSlider'
import { HomeLoading } from './(main)/_components/HomeLoading/HomeLoading'
import CardProduct from './(main)/_components/CardProduct/CardProduct'




export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data : products = await res.json()
const productsList : Product[] = data.data


  return (
   <>

   <MainSlider/>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 p-5'>
   <Suspense fallback = {<HomeLoading/>}>

    {productsList.map((prduct)=>{

    return <CardProduct key={prduct._id} product={prduct}  /> 

  
   })}
   </Suspense>
  </div>
   </>
  )
}

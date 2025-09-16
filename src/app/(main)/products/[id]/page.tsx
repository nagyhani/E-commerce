import { productDetails, singleProduct } from '@/types/productDetails';
import React from 'react'
import DetailsCard from '../../_components/DetailsCard/DetailsCard';




export default async function ProductDetails({params} :{params :{id : string}}) {

    const {id} = await params
    console.log(id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data: productDetails = await res.json()
   const singleProduct : singleProduct = data.data
    
    
  return (

    <>

   <DetailsCard singleProduct = {singleProduct}/>
    
    </>

  )
}

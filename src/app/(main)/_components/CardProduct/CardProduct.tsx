'use client'

import React, { useContext, useEffect, useState } from 'react'


import {

  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card"


import { Product, products } from './../../../../types/product. d';
import  Image  from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { addProductToCart } from '@/app/cartAction/cartAction';
import { string } from 'zod';
import { toast } from 'sonner';
import { countContext } from '@/app/countProvider';
import { addProductToWish, getWishListUser } from '@/app/wishListAction/wishListAction';
import { ProductElement } from '@/types/cart.type';



export default function CardProduct({product} : {product:Product}) {

   const context = useContext(countContext);

if (!context) {
  throw new Error("countContext must be used inside CountProvider");
}

const { setCount, count } = context;

 async function productToCart(id : string){

  try {

      const data = await addProductToCart(id)

   if(data.status == "success"){
   toast.success(data.message, {position: 'top-center'})

    const cart = data.data;

        let sum = 0;
        cart?.products?.forEach((item: ProductElement) => {
          sum += item.count;
        });

        setCount(sum);
   }

  } catch(err) {

    toast.error("can't Add Product To Cart Without Login First", {position: 'top-center'})

  }

 
   
  }





   async function addProductToWishList(id:string){

      try {

        const data = await addProductToWish(id)
    
           if(data.status == 'success'){
            toast.success(data.message , {position: 'top-center'})
          
            
            
           }

      } catch(err) {
         toast.error("can't Add Product To Wishlist Without Login First", {position: 'top-center'})

      }
            
            
        }

   const {imageCover,category:{name},ratingsAverage,title,price , _id ,id} = product
  return (


   <>
   

   
    <Card className="group w-full text-center border border-white rounded-2xl hover:shadow-[0_4px_30px_rgba(16,200,129,0.7)] transition-shadow duration-500 cursor-pointer relative overflow-hidden">
  

  <Link href={"/products/" + _id} className="block">
    <CardHeader>
      <Image
        className="mx-auto"
        src={imageCover}
        alt={title}
        width={300}
        height={300}
      />
    </CardHeader>

    <CardContent>
      <span className="text-main text-sm">{name}</span>
      <h4 className="text-lg my-1">
        {title.split(" ").slice(0, 2).join(" ")}
      </h4>
    </CardContent>

    <CardFooter className="flex justify-between">
      <h4>{price} EGP</h4>
      <h6>
        <i className="fa-solid fa-star text-rating"></i>
        {ratingsAverage}
      </h6>
    </CardFooter>
  </Link>

  {/* Buttons (hidden by default, appear on hover) */}
  <div className="flex justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-3 px-7">
    <Button
      onClick={() => productToCart(_id)}
      className="flex-1 bg-main text-white rounded-2xl cursor-pointer"
    >
      Add To Cart
    </Button>

    <Button
      onClick={() => addProductToWishList(_id)}
      className="flex-1 bg-main text-white rounded-2xl cursor-pointer"
    >
      Add To Wishlist
    </Button>
  </div>
</Card>

   
   </>
   
  

  )
}

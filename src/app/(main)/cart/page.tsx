'use client'
import { clearCart, deleteSpecificProduct, GetUserCart, updateCountItems } from '@/app/cartAction/cartAction'
import { Button } from '@/components/ui/button'
import { cartData, cartItem, ProductElement } from '@/types/cart.type'
import { Item } from '@radix-ui/react-navigation-menu'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useContext } from 'react';
import { countContext } from '@/app/countProvider'
import Link from 'next/link'



export default function Cart() {
 const [loading , setLoading] = useState(true)
 const [cart , setCart] = useState<cartItem>()
 const [countLoading , setCountLoading] = useState(true)
 const [currentId , setCurrentId] = useState<string>()
 const [countDisable , setCountDisable] = useState(false)

  useEffect(()=>{
    getCart()
  },[])


 const context = useContext(countContext);

if (!context) {
  throw new Error("countContext must be used inside CountProvider");
}

const { setCount, count } = context;
  async function getCart(){

    setLoading(true)
  const data : cartData = await GetUserCart()

  setCart(data.data)

  setLoading(false)

     const cart = data.data;

        let sum = 0;
        cart?.products?.forEach((item: ProductElement) => {
          sum += item.count;
        });

        setCount(sum);
   
 
  
  }


  async function deleteProduct( id : string){
   const data = await deleteSpecificProduct(id)

   if(data.status === 'success'){
    toast.success('Item Deleted Succesfully', {position : 'top-center'})
    setCart(data.data)
   }

   const cart = data.data;

        let sum = 0;
        cart?.products?.forEach((item : ProductElement) => {
          sum += item.count;
        });

         setCount(sum);
 
   
  }


 async function deleteCart(){

   const data = await clearCart()

  if(data.message == 'success'){
   toast.success('Cart Deleted Succesfully', {position : 'top-center'})
     setCart(data.data)
  }
   
  setCount(0)
  }


  async function updateCount( id :string , count : number){
    setCountDisable(true)
    setCurrentId(id)
    setCountLoading(true)
    const data = await updateCountItems(id ,count)
    
   setCart(data.data)

   const cart = data.data;

        let sum = 0;
        cart?.products?.forEach((item: ProductElement) => {
          sum += item.count;
        });

         setCount(sum);

    setCountLoading(false)
    setCountDisable(false)
  }

 

  return (
    
    <>

    
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center bg-gray-100 ">
  {loading ? <span className="loader my-64"></span> : 
  

  <>
  
  {cart?.totalCartPrice !=0 ? <>

  <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
         <th scope="col" className=" py-3">
          Image
        </th>
        <th scope="col" className=" py-3">
          Product
        </th>
        <th scope="col" className=" py-3">
          Qty
        </th>
        <th scope="col" className=" py-3">
          Price
        </th>
        <th scope="col" className=" py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     {cart?.products.map((item : ProductElement)=>{

      return  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="">
          <Image src={item.product.imageCover} alt={item.product.title} width={100} height={100}/>
        </td>
        <td className=" py-4 font-semibold text-gray-900 dark:text-white w-3/12">
          {item.product.title}
        </td>
        <td className="py-4 me-10">
          <div className="flex items-center  border-[#0AAD0A] p-1.5 border-2 justify-center rounded-3xl ">
            <button disabled = {countDisable} onClick={()=>{

              updateCount(item.product._id , item.count -= 1)

            }} className="inline-flex items-center justify-center  text-sm font-medium h-6 w-6 text-gray-500 bg-white cursor-pointer  focus:outline-none hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 " type="button">
              { item.count == 1 ? <i className="fa-solid fa-trash "></i> :<>
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
              </>}
            </button>
            <div className='mx-2'>
            {countLoading && item.product._id == currentId  ? <i className="fa-solid fa-circle-notch fa-spin text-main"></i> : item.count }
            </div>
            <button disabled = {countDisable} onClick={()=>{

              updateCount(item.product._id , item.count += 1)

            }} className="inline-flex items-center justify-center h-6 w-6 p-1  text-sm font-medium text-gray-500 bg-white cursor-pointer  focus:outline-none hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {item.price}  EGP
        </td>
        <td className="px-1 py-4">
          <Button onClick={()=>{
            deleteProduct(item.product._id)
          }} className='bg-red-500 hover:bg-red-400 cursor-pointer '> <i className="fa-solid fa-trash "></i></Button>
        </td>
      </tr>

     })}
      
    </tbody>
  </table> <div>

    
  </div>
  
  </>  : <span className="my-2">Cart Is Empty</span>}
  </>
  
  }


</div>

<div className='flex justify-between mt-5'>

{cart?.totalCartPrice == 0 ? "" : <>
<Button onClick={()=>{
    deleteCart()
  }} className='bg-red-600 px-3 py-5  hover:bg-red-500 cursor-pointer rounded-lg'> Clear Cart</Button>

<div className='ms-20'> <h5 className='text-fa-bold'> subtotal ({count} items) : {cart?.totalCartPrice} EGP</h5>
<Link href = {'/CheckOutSession/' + cart?._id}> <Button className = " bg-main text-white rounded-lg cursor-pointer mt-2">Pay By Card</Button></Link>
 <Link href = {`/CashOnDelivery/` + cart?._id}> <Button className = " bg-main text-white rounded-lg cursor-pointer mt-2 ms-1.5">COD (Cash On Delivery)</Button> </Link>
</div>
</> }



</div>

  
    </>


  )
}

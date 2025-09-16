
'use client'
import { addProductToCart } from '@/app/cartAction/cartAction'
import { countContext } from '@/app/countProvider'
import { addProductToWish, deleteProductWish, getWishListUser } from '@/app/wishListAction/wishListAction'
import { Button } from '@/components/ui/button'
import { ProductElement } from '@/types/cart.type'
import { WishListItem, WishLists } from '@/types/wishList.type'
import Image from 'next/image'
import React from 'react'
import  {useContext, useEffect, useState}  from 'react'
import { toast } from 'sonner'



export default function WishList() {


    const [item, setItem] = useState<WishLists | null>(null);

    const [loading ,setLoading] = useState(true)

    useEffect(()=>{
        getWishList()
    },[])

   async function getWishList(){

    setLoading(true)
       const data: WishLists = await getWishListUser()

       setItem(data)
      setLoading(false) 
    }




async function deleteProduct(id : string){
   const data = await deleteProductWish(id)

   if(data.status == 'success'){
    toast.success(data.message , {position : 'top-center'})
   getWishList()
   }
   
}

const context = useContext(countContext);

if (!context) {
  throw new Error("countContext must be used inside CountProvider");
}

const { setCount, count } = context;

 async function addProductFromWish(id : string){
 const data = await addProductToCart(id)

 console.log(data);
 if(data.status = 'success'){
  toast.success(data.message ,  {position: 'top-center'})
   const cart = data.data;

        let sum = 0;
        cart?.products?.forEach((item: ProductElement) => {
          sum += item.count;
        });

        setCount(sum);
 }
 }

  return (
   <>
    <h1 className='text-3xl'>My Wishlist</h1>
   
        
         {loading ? <div className='flex justify-center'>
            <span className="loader my-64"></span>
         </div> :    <div>
                {item?.data.map((ele)=>{

                    return <>
                     <div key={ele._id} className=' w-full lg:w-4/5 mx-auto my-3.5 shadow-2xl flex justify-between items-center px-1.5'>
                        <div className='p-4 flex items-center'> 
                        <Image src={ele.imageCover} alt= {ele.title} width={150} height={150}/>
                       <div className='mx-2.5'>
                         <h5 className='text-md'>{ele.title}</h5>
                        <h6 className='my-2'>{ele.price} EGP</h6>
                        <i onClick={()=>{
                            deleteProduct(ele.id)
                        }} className="fa-solid fa-trash text-red-600 cursor-pointer "></i> <span className='text-red-600 cursor-pointer'> Remove</span>
                       </div>
                    </div>

                   <div className='lg:me-3' ><button onClick={()=>{
                    addProductFromWish(ele._id)
                   }} className='bg-white text-green-600 border-2 border-main px-1.5 py-1 rounded-2xl hover:bg-green-600 hover:text-white cursor-pointer text-sm'> Add To Cart</button></div>
                     </div>
                 
                    </>

                })}
            </div>
       }
   
   </>
  )
}

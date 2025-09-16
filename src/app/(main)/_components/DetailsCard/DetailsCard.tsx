'use client'

import { singleProduct } from '@/types/productDetails'
import Image from 'next/image'
import { useContext } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addProductToCart } from '@/app/cartAction/cartAction';
import { toast } from 'sonner';
import { countContext } from '@/app/countProvider';
import { addProductToWish } from '@/app/wishListAction/wishListAction';
import { ProductElement } from '@/types/cart.type';


export default function DetailsCard({singleProduct} : {singleProduct:singleProduct}) {

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

    const {imageCover,title,description,category :{name},price,ratingsAverage,images,_id} = singleProduct
  return (
    <div className='grid grid-cols-12 items-center'>

          
        <div className='col-span-4 '>
          <Popover>
      <PopoverTrigger asChild>
         <Image className='cursor-pointer' src={imageCover} alt={title} width={400} height={400}/>
      </PopoverTrigger>
      <PopoverContent className="w-96 relative left-60 bottom-80">
         <Carousel className="w-4/6">
  <CarouselContent>
    {images.map((img, index) => (
      <CarouselItem key={index}>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6 ">
            <Image className='cursor-pointer' src={img} alt={title} width={600} height={400} />
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
      </PopoverContent>
    </Popover>

            
        </div>

        <div className='col-span-8'>
         <div className='flex justify-end'>
           <Button
              onClick={() => addProductToWishList(_id)}
              className=" bg-main text-white rounded-2xl cursor-pointer"
            >
              Add To Wishlist
            </Button>
         </div>
           <div>
            <h2 className='my-2 text-2xl'>{title}</h2>
            <span className='my-2 text-sm text-gray-500'>{description}</span>
            </div> 

            <div >
                <h5 className='my-2'>{name}</h5>
                <div>
                    <h5 className='my-2'>{price} EGP</h5>
                    <h6> <i className="fa-solid fa-star text-rating"></i>{ratingsAverage}</h6>
                </div>
            </div>

            <Button  onClick={()=>{
              productToCart(_id)
          
            }} variant="outline" className=" mx-auto bg-main text-white rounded-2xl cursor-pointer mt-2.5">
                   Add To Cart
                  </Button>
        </div>
    </div>
  )
}

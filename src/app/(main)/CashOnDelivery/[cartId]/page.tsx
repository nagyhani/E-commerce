'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { cashPaymentSession } from '../../ordersAction/ordersAction'
import { toast } from 'sonner'
import { countContext } from '@/app/countProvider'
import { ProductElement } from '@/types/cart.type'

export default function CheckOut() {

   const context = useContext(countContext);
    

  const router = useRouter()

 const {cartId} : {cartId : string} = useParams()
 console.log(cartId);
 

  const ordersSchema = z.object({
     details : z.string().nonempty('Requierd').min(3 ,'must be at least 3 chars').max(20 , 'max chars is 20'),
     city: z.string().nonempty(' Required'),
     phone: z.string().nonempty("Phone is Required").regex(/^(\+2)?01[0125][0-9]{8}$/,'Enter Valid Phone Number')
   })

   const registerForm = useForm({
       defaultValues:{
       details:"",
       city:"",
       phone:""
       },
   
       resolver: zodResolver(ordersSchema)
     })


  async function handelCheckOutCash(values : {details : string, city : string , phone: string}){
    
    if (!context) {
      throw new Error("countContext must be used inside CountProvider");
    }
    
    const { setCount, count } = context;
    
    const data = await cashPaymentSession( cartId, values)

    if(data.status == 'success'){
      toast.success('Order Placed successfully' ,{position : 'top-center'})
      router.push('/allorders')

      const cart = data.data;
      
              let sum = 0;
              cart?.products?.forEach((item: ProductElement) => {
                sum += item.count;
              });
      
              setCount(sum);

    }

    
    
  }

 
 
  return (
    <div>

      <Form {...registerForm}>

        <h1 className='text-2xl my-5'>Address details</h1>

        <form className='w-3/4 mx-auto space-y-5' onSubmit={registerForm.handleSubmit(handelCheckOutCash)} >

          <FormField
    control={registerForm.control}
    name="details"
    render={({field}) => (
      <FormItem>
       <FormLabel>  Details:</FormLabel> 
        <FormControl>
          <Input type='text' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />

   <FormField
    control={registerForm.control}
    name="city"
    render={({field}) => (
      <FormItem>
       <FormLabel>  City:</FormLabel> 
        <FormControl>
          <Input type='text' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />

   <FormField
    control={registerForm.control}
    name="phone"
    render={({field}) => (
      <FormItem>
       <FormLabel> Phone:</FormLabel> 
        <FormControl>
          <Input type='tel' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />

   
     <Button className=' bg-main my-5 cursor-pointer'>
   Submit
  </Button>

  
 
        </form>
</Form>
    </div>
  )
}
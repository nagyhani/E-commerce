'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { paymentSession } from '../../ordersAction/ordersAction'
import Link from 'next/link'

export default function CheckOut() {

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


  async function handelCheckOut(values : {details : string, city : string , phone: string}){
    const data = await paymentSession( cartId, values)
  window.open(data.session.url , '_self')
    
    
  }

 
 
  return (
    <div>

      <Form {...registerForm}>

        <h1 className='text-2xl my-5'>Address details</h1>

        <form className='w-3/4 mx-auto space-y-5' onSubmit={registerForm.handleSubmit(handelCheckOut)} >

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

   <div className = "flex justify-between">
     <Button className=' bg-main my-5 cursor-pointer'>
    Pay By Card
  </Button>

  
   </div>
        </form>
</Form>
    </div>
  )
}

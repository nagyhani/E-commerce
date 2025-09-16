'use client'

import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import path from 'path';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import * as z from 'zod'

export default function ForgetPassword() {

const router = useRouter()
  const forgetPasswordSchema = z.object({
    email: z.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Email is invalid'),
    
   
  })

 

  const registerForm = useForm({
    defaultValues:{
    email:"",
   
  
    },

    resolver: zodResolver(forgetPasswordSchema)
  })


  async function handelForgetPassword(valu : z.infer<typeof forgetPasswordSchema >){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords` , {
      method : 'post',
      body : JSON.stringify(valu),
      headers :{
        'content-type' : 'application/json'
      }
    })

    const data = await res.json()

    console.log(data);
    
    
    if(data.statusMsg == 'success'){
      toast.success(data.message, {position: 'top-center'})
      router.push('/ResetCode')
    }else{
      toast.error(data.message, {position: 'top-center'})
      
    }
    
  }
  return (
    <div>

      <Form {...registerForm}>

      

        <form className='w-3/4 mx-auto space-y-5' onSubmit={registerForm.handleSubmit(handelForgetPassword)} >

   <FormField
    control={registerForm.control}
    name="email"
    render={({field}) => (
      <FormItem>
       <FormLabel>  Email:</FormLabel> 
        <FormControl>
          <Input type='email' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />

  
  
  <Button className='w-full bg-main my-5 cursor-pointer'>
    Send Email
  </Button>
        </form>
</Form>
    </div>
  )
}
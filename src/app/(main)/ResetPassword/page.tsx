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

export default function ResetPassword() {

const router = useRouter()
  const resetPasswordSchema = z.object({
    email: z.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Email is invalid'),
    newPassword: z.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password Is invalid'),
   
  })

 

  const registerForm = useForm({
    defaultValues:{
    email:"",
    newPassword:"",
  
    },

    resolver: zodResolver(resetPasswordSchema)
  })


  async function handelResetPassword(valu : z.infer<typeof resetPasswordSchema >){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword` , {
      method : 'put',
      body : JSON.stringify(valu),
      headers :{
        'content-type' : 'application/json'
      }
    })

    const data = await res.json()
    console.log(data);
    
    
    if(data.token){
      toast.success('Password Changed Succesfully', {position: 'top-center'})
      router.push('/Login')
    }else{
      toast.error(data.message, {position: 'top-center'})
      
    }
    
  }
  return (
    <div>

      <Form {...registerForm}>

        <h1 className='text-2xl my-5'>Register Now</h1>

        <form className='w-3/4 mx-auto space-y-5' onSubmit={registerForm.handleSubmit(handelResetPassword)} >

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

   <FormField
    control={registerForm.control}
    name="newPassword"
    render={({field}) => (
      <FormItem>
       <FormLabel>New Password:</FormLabel> 
        <FormControl>
          <Input type='password' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />


  
  
  <Button className='w-full bg-main my-5 cursor-pointer'>
    Change Password
  </Button>
        </form>
</Form>
    </div>
  )
}
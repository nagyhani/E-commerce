'use client'

import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import path from 'path';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import * as z from 'zod'

export default function ResetCode() {

const router = useRouter()
  const ResetCodeSchema = z.object({
    resetCode: z.string().nonempty('Code is required')
    
   
  })

 

  const registerForm = useForm({
    defaultValues:{
    resetCode:"",
   
  
    },

    resolver: zodResolver(ResetCodeSchema)
  })


  async function handelForgetPassword(valu : z.infer<typeof ResetCodeSchema >){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode` , {
      method : 'post',
      body : JSON.stringify(valu),
      headers :{
        'content-type' : 'application/json'
      }
    })

    const data = await res.json()

    console.log(data);
    
    
    if(data.status == 'Success'){
     
      router.push('/ResetPassword')
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
    name="resetCode"
    render={({field}) => (
      <FormItem>
       <FormLabel>  Reset Code:</FormLabel> 
        <FormControl>
          <InputOTP {...field}
        maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />

   
     

  
  
  <Button className=' bg-main my-5 cursor-pointer'>
  submit
  </Button>
        </form>
</Form>
    </div>
  )
}
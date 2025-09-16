
'use client'

import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import * as z from 'zod'

export default function Register() {

const router = useRouter()
  const registerSchema = z.object({
    name : z.string().nonempty('Name Requierd').min(3 ,'must be at least 3 chars').max(20 , 'max chars is 20'),
    email: z.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Email is invalid'),
    password: z.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password Is invalid'),
    rePassword: z.string().nonempty('Confirm Password is Requierd'),
    phone: z.string().nonempty("Phone is Required").regex(/^(\+2)?01[0125][0-9]{8}$/,'Enter Valid Phone Number')
  }).refine((obj)=>{
    return obj.password == obj.rePassword
  }, {path:['rePassword'],
    error:'Passwords not Matched'

  })

 

  const registerForm = useForm({
    defaultValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },

    resolver: zodResolver(registerSchema)
  })


  async function handelRegister(valu : z.infer<typeof registerSchema >){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup` , {
      method : 'post',
      body : JSON.stringify(valu),
      headers :{
        'content-type' : 'application/json'
      }
    })

    const data = await res.json()
    
    if(data.message == 'success'){
      toast.success('Account Created!', {position: 'top-center'})
      router.push('/Login')
    }else{
      toast.error(data.message, {position: 'top-center'})
      
    }
    
  }
  return (
    <div>

      <Form {...registerForm}>

        <h1 className='text-2xl my-5'>Register Now</h1>

        <form className='w-3/4 mx-auto space-y-5' onSubmit={registerForm.handleSubmit(handelRegister)} >

          <FormField
    control={registerForm.control}
    name="name"
    render={({field}) => (
      <FormItem>
       <FormLabel>  Name:</FormLabel> 
        <FormControl>
          <Input type='text' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />

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
    name="password"
    render={({field}) => (
      <FormItem>
       <FormLabel> Password:</FormLabel> 
        <FormControl>
          <Input type='password' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />

   <FormField
    control={registerForm.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
       <FormLabel>  Confirm Password:</FormLabel> 
        <FormControl>
          <Input type='password' {...field}/>
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
       <FormLabel>  Phone:</FormLabel> 
        <FormControl>
          <Input type='tel' {...field}/>
        </FormControl>
      

        <FormMessage />
      </FormItem>
    )}
  />
  <Button className='w-full bg-main my-5 cursor-pointer'>
    Register
  </Button>
        </form>
</Form>
    </div>
  )
}

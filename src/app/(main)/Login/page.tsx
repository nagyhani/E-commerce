
'use client'
import { signIn } from "next-auth/react"
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import path from 'path';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import * as z from 'zod'
import { getUserToken } from "@/getUserToken";
import { GetUserCart } from "@/app/cartAction/cartAction";
import { countContext } from "@/app/countProvider";
import { ProductElement } from "@/types/cart.type";

export default function Login() {

const router = useRouter()
  const loginSchema = z.object({
    email: z.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Email is invalid'),
    password: z.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password Is invalid'),
   
  })

  const context = useContext(countContext);

if (!context) {
  throw new Error("countContext must be used inside CountProvider");
}

const { setCount, count } = context;

 

  const registerForm = useForm({
    defaultValues:{
    email:"",
    password:"",
  
    },

    resolver: zodResolver(loginSchema)
  })


  async function handelLogin(valu : z.infer<typeof loginSchema >){
    
   const data = await signIn('credentials',{
      email: valu.email,
      password : valu.password,
      redirect: false    
    })
    
    if(data?.ok){
       toast.success('Logged Succefully', {position: 'top-center'})
       const token = await getUserToken();
           if (token) {
             try {
               const response = await GetUserCart();
       
               
               const cart = response.data;
       
               let sum = 0;
               cart?.products?.forEach((item: ProductElement) => {
                 sum += item.count;
               });
       
               setCount(sum);
             } catch (err) {
               console.error("Error fetching cart:", err);
             }
           }
      router.push('/')

    } else{
        toast.error(data?.error, {position: 'top-center'})
    }


    
  }
  return (
    <div>

      <Form {...registerForm}>

        <h1 className='text-2xl my-5'>Login</h1>

        <form className='w-3/4 mx-auto space-y-5' onSubmit={registerForm.handleSubmit(handelLogin)} >

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

<Link href={'/ForgetPassword'} className='cursor-pointer'> <span className='text-blue-600 underline text-sm'>Forget Password</span></Link>
  
  
  <Button className='w-full bg-main my-5 cursor-pointer'>
    Login
  </Button>
        </form>
</Form>
    </div>
  )
}

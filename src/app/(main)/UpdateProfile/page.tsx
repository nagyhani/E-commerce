'use client'
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { getUserToken } from "@/getUserToken"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



export default function ProfileForm() {
const updateInfoSchema = z.object({
    email: z.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Email is invalid'),
    password: z.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password Is invalid'),
    phone: z.string().nonempty("Phone is Required").regex(/^(\+2)?01[0125][0-9]{8}$/,'Enter Valid Phone Number')
  })


    
  const updateInfoForm = useForm({
    defaultValues: {
      email: "",
      password : '',
      phone : '',
    },

    resolver: zodResolver(updateInfoSchema)
  });

 const route = useRouter()

async  function handelUpdateInfo(values : z.infer<typeof updateInfoSchema >) {

      const token  = await getUserToken()
        
            if(!token){
        
                throw new Error('Token Requierd')
        
            }
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`, {
      method : 'put',
      body : JSON.stringify(values),
      headers :{
        token : token,
        'content-type' : 'application/json'
      }
    })

    const data = await res.json()
    console.log(data);
    

  if(data.message == 'success'){
    toast.success('Profile Updated' ,{position:'top-center'})
    route.push('/')
  }else{
    toast.error(data.errors.msg ,{position : 'top-center'})

  }
    
  }


  

  return (
    <div>

        <h1 className="my-4 text-2xl">Update Profile</h1>
      <Form {...updateInfoForm}>
        <form onSubmit={updateInfoForm.handleSubmit(handelUpdateInfo)} className="space-y-8">
          <FormField
            control={updateInfoForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type= 'email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

              <FormField
            control={updateInfoForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type = 'password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

              <FormField
            control={updateInfoForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type = 'tel' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className=" bg-white text-green-500 border-1 border-green-500 cursor-pointer hover:bg-green-500 hover:text-white" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

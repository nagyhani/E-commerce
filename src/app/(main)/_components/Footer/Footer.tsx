import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



export default function Footer() {




  const menuAuthItems : { content: string}[] = [
  
    { content : "fa-brands fa-facebook"},
    { content : "fa-brands fa-youtube"},
    { content : "fa-brands fa-tiktok"},
    { content : "fa-brands fa-twitter"},
    { content : "fa-brands fa-instagram"},
    { content : "fa-brands fa-linkedin"},
  
    
  ]
  return (
    <div className='py-7 px-10 bg-gray-200  min-w-full '>

      <div className='flex justify-between'>
        <div>
          <h1 className='text-2xl'>Get The FreshCart App</h1>
        <p className='text-gray-400'>We Will Send You a Link, Open it On Your Phone To Download The App </p>

        </div>

        <div className="flex flex-row gap-5">
          
          {menuAuthItems.map((item ,id)=>{


return  <i  key={id} className= {item.content} ></i>

   
         
          
          })}
           </div> 
      </div>

      <div>
         <div className="flex w-full items-center gap-4 my-5">
      <Input className='bg-white outline-0' type="email" placeholder="Email.." />
      <Button type="submit" className='bg-main  cursor-pointer'>
        Share App Link
      </Button>
    </div> 
      </div>



<div className='h-0.5 w-full bg-gray-300 my-5'></div>
<div className='flex justify-between'>

   <div>
        
        <h5> Payment Partners </h5>
        
    </div>


     <div>
       
        <h5> Get Delivers with FreshCart </h5>
       
      </div>
</div>
     <div className='h-0.5 w-full bg-gray-300 my-5'></div>


    </div>
  )
}



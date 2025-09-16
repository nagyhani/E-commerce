'use server'

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
  const cookiesData = await cookies()
 const encryptToken =  cookiesData.get('next-auth.session-token')?.value

 const decryptToken = await  decode({token : encryptToken , secret: process.env.AUTH_SECRET!})

 return decryptToken?.accessToken
}
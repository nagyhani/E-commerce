'use server'

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


const TokenSession = (process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token")
export async function getUserToken(){
  const cookiesData = await cookies()
 const encryptToken =  cookiesData.get(TokenSession)?.value

 const decryptToken = await  decode({token : encryptToken , secret: process.env.AUTH_SECRET!})

 return decryptToken?.accessToken
}
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";



const nextOptions : NextAuthOptions = {
    pages :{signIn : '/Login' },

    providers : [
        Credentials({
            name : "Credentials",
            credentials:{
                email: {},
                password :{}
            },

async authorize(credentials) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
    method: "POST",
    body: JSON.stringify({
      email: credentials?.email,
      password: credentials?.password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (data.message === "success") {
    const decodedToken: { id: string } = jwtDecode(data.token);

    return {
      id: decodedToken.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role, // optional
      token: data.token,
    };
  } else {
    return null; // 👈 safer than throwing, avoids TS errors
  }
}
        })
    ],

callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.accessToken = user.token;
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      if (user.role) token.role = user.role;
    }
    return token;
  },

  async session({ session, token }) {
    session.user = {
      id: token.id,
      name: token.name,
      email: token.email,
      role: token.role,
    };
    session.accessToken = token.accessToken;
    return session;
  },
}
}



const handler = NextAuth(nextOptions)

export { handler as GET, handler as POST }
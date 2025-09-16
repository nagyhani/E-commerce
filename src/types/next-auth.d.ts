import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    role?: string;   // if your API sends it
    token: string;   // custom field from API
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role?: string;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role?: string;
    accessToken: string;
  }
}

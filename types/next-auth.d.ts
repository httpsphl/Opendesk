import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: { id: string; role: "USER" | "AGENT" | "ADMIN" } & DefaultSession["user"];
  }
  interface User {
    role: "USER" | "AGENT" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT { role?: "USER" | "AGENT" | "ADMIN"; }
}

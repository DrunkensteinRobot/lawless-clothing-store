import NextAuth from "next-auth"

// Basic NextAuth setup. We will add Providers (Credentials/OAuth) 
// and the Sanity Adapter in Phase 4 when configuring web payments.
const handler = NextAuth({
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
     authorization: {
        params: { scope: " user:email" },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account?.access_token) {
        return false;
      }

      // Send GitHub access token to Django backend
      const response = await fetch("http://localhost:8000/auth/convert-token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "convert_token",
          client_id: process.env.DJANGO_CLIENT_ID,
          client_secret: process.env.DJANGO_CLIENT_SECRET,
          backend: "github",
          token: account.access_token,
        }),
      });

      const data = await response.json();
      console.log("Django response:", data);

      if (data.access_token) {
        account.access_token = data.access_token; // Store converted token
        return true; 
      }
      return false; 
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // Store Django token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Use Django token in session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

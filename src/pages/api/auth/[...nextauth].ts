import NextAuth from "next-auth/next";

export default NextAuth({
    providers: {
        SpotìyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        })
    }
})
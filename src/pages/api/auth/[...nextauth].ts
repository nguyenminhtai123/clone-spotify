import { CallbacksOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import { scopes } from '../../../../config/spotify';

const jwtCallback: CallbacksOptions['jwt'] = ({ token, account, user }) => {
    console.log('ACCOUNT', account);
    console.log('USER', user);
    return token;
};

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: {
                url: 'https://accounts.spotify.com/authorize',
                params: {
                    scope: scopes,
                },
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt: jwtCallback,
    },
});

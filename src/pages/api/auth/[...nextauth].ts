import { CallbacksOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import { scopes, spotifyApi } from '../../../../config/spotify';
import { ExtendedToken, SessionExtend, TokenError } from '../../../../types';

const refreshAcsessToken = async (token: ExtendedToken): Promise<ExtendedToken> => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);
        // Hey, spotify, please refresh my access token
        const { body: refreshedTokens } = await spotifyApi.refreshAccessToken();

        console.log('refresh token are: ', refreshedTokens);

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            refreshTokens: refreshedTokens.refresh_token || token.refreshToken,
            accessTokenExpressAt: Date.now() + refreshedTokens.expires_in * 1000,
        };
    } catch (err) {
        console.error(err);

        return {
            ...token,
            error: TokenError.RefreshAccessTokenError,
        };
    }
};

const jwtCallback: CallbacksOptions['jwt'] = async ({ token, account, user }) => {
    let extendedToken: ExtendedToken;

    // User logs in for the first time
    if (account && user) {
        extendedToken = {
            ...token,
            user,
            accessToken: account.access_token as string,
            refreshToken: account.refresh_token as string,
            accessTokenExpiresAt: (account.expires_at as number) * 1000,
        };

        console.log('first time login, extended token: ', extendedToken);
        return extendedToken;
    }

    // Subsequent requests to check auth sessions
    if (Date.now() + 5000 < (token as ExtendedToken).accessTokenExpiresAt) {
        console.log('ACESS TOKEN STILL Valid, retuenning extended token: ', token);
        return token;
    }

    // Access token has expired, refresh it
    console.log('Access token has expired, refreshing...');
    return await refreshAcsessToken(token as ExtendedToken);
};

const sessionCallback: CallbacksOptions['session'] = async ({ session, token }) => {
    const newSession: SessionExtend = {
        ...session,
        accessToken: (token as ExtendedToken).accessToken,
        error: (token as ExtendedToken).error,
    };

    return newSession;
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
        session: sessionCallback,
    },
});

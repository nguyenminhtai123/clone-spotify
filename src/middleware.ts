import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const middleware = async (req: NextRequest) => {
    // if user is login, token will exist
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    console.log(pathname);

    // Allow request if (1) token exists
    // or (2) it is a request for NEXT_AUTH session & provider
    // or (3) it is a request to '/_next/' (/_next/static/)

    if (token || pathname.includes('/api/auth') || pathname.includes('/_next/')) {
        if (pathname === '/login') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    }

    // Redirect to login if (1) user does   a token AND (2) is requiring protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
};

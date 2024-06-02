export const httpOnlyCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};

export const commonCookieOptions = {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 30 * 60 * 1000),
};

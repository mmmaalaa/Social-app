export const setAuthCookie = (res, token, tokenRole) => {
  res.cookie(tokenRole, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

export const tokenRoles = {
  access: "access",
  refresh: "refresh",
}
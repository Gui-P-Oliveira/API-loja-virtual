class UserDBError extends Error{};
class ProductDBError extends Error{};
class TokenDBError extends Error{};

export const userDBError = new UserDBError()
export const productDBError = new ProductDBError()
export const tokenDBError = new TokenDBError()
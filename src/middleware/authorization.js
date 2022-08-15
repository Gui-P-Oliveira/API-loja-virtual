import getUserByTokenId from '../services/authorization.js'

const authorizationMiddleware = async (req, res, next) => {
  const tokenId = req.headers.authorization;
  const user = await getUserByTokenId(tokenId)  

  next();
};

export default authorizationMiddleware;

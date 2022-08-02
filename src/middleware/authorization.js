

const authorizationMiddleware = async (req, res, next) => {
  const tokenId = req.headers.authorization;
  console.log(tokenId);

  try {
    await getValidToken(tokenId);
  } catch (e) {
    res.status(404).send("Unauthorizade");
    return;
  }

  next();
};

export default authorizationMiddleware

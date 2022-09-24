import jwt from "jsonwebtoken";

const authenticationMiddleware = async (req, res, next) => {
  const token = await req.headers.authorization;

  try {
    jwt.verify(token, "meu_salt");
  } catch (e) {
    res.status(404).send("Unauthorizade jwt e auth");
    return;
  }

  next();
};

export default authenticationMiddleware;

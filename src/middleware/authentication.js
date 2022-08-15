import jwt from "jsonwebtoken";

const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const data = jwt.verify(token, "meu salt");
  } catch (e) {
    res.status(404).send("Unauthorizade");
    return;
  }

  next();
};

export default authenticationMiddleware;

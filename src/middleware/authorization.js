import jwt from "jsonwebtoken";

const authorizationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const validToken = jwt.verify(token, "meu_salt");
  const userRole = validToken.role;

  try {
    switch (userRole) {
      case "client":
        if (req.path == "/product" && req.method != "GET") {
          res.status(403).send("caiu no authorization");
          return;
        }
        break;

      default:
        break;
    }
  } catch (error) {}

  next();
};

export default authorizationMiddleware;

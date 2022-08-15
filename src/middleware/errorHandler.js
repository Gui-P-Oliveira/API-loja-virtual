import { userDBError, productDBError, tokenDBError } from "../errors/dberror.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof { userDBError, productDBError, tokenDBError }) {
    return res.status(400).send("Bad request");
  } else if (error) {
    return next(error);
  } else {
    return next();
  }
};

export default errorHandler;

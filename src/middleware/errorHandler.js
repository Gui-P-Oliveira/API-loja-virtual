import DBError from "../errors/dberror.js";

const errorHandler = (error, req, res, next) => {  
  if (error instanceof DBError) {
    return res.status(400).send("Bad request errorhandler");
  } else if (error) {
    return next(error);
  } else {
    return next();
  }

};

export default errorHandler;

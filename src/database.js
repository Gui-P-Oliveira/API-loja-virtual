import mongoose from "mongoose";
import { MONGO_URL } from "./constants.js";
import logger from "./services/logger.js";

const connect = async (tentativa = 1) => {
  try {
    mongoose.connect(MONGO_URL);
    logger.info("Conected");
  } catch (e) {
    logger.error(`Conection failed: ${e}`);
    setTimeout(() => connect(tentativa + 1), 3000 ** tentativa);
  }
};

connect();

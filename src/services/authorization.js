import { getValidToken } from "../models/token.js";
import { getUserById } from "../models/users.js";

const getUserByTokenId = async (tokenId) => {
  const token = await getValidToken(tokenId);
  return await getUserById(token.userId);
};

export default getUserByTokenId;
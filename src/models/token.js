import mongoose from "mongoose";
import moment from "moment";

const TokenModel = mongoose.model("Token", {
  createdAt: Date,
  active: Boolean,
  userId: String,
  userRole: String
});

export const createToken = async (userId, userRole) => {
  const token = new TokenModel();

  token.createdAt = new Date();
  token.active = true;
  token.userId = userId;
  token.userRole = userRole;
  
  await token.save();

  return token;
};

export const getValidToken = async (tokenId) => {
  const token = await TokenModel.findById(tokenId);

  if (!token) throw new Error("Token inválido");

  if (!token.active) throw new Error("Token inativo");

  const expireAt = moment(token.createdAt);

  expireAt.add(2, 'hours');

  if (expireAt < moment()) throw new Error("Token inativo");

  return token;
};

export const disableToken = async(tokenId) => {
  const token = await TokenModel.findById(tokenId);
  
  token.active = false;
  
  await token.save()

  return token;
}

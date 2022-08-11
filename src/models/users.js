import mongoose from "mongoose";
import DBError from "../errors/dberror.js";

const UserModel = mongoose.model("Users", {
  name: String,
  username: String,
  email: String,
  password: String,
  role: String
});

export const createNewUser = async ({ name, username, email, password }) => {
  const checkUserRegistered = await getUserByUserNameOrEmail({
    username,
    email,
  });

  if (checkUserRegistered) {
    throw new DBError('usuario ou senha já cadastrado.');
  }

  const newUser = new UserModel();

  newUser.name = name;
  newUser.username = username;
  newUser.email = email;
  newUser.password = password;
  newUser.role = 'client'

  await newUser.save();

  return newUser;
};

export const getUserByUserNameOrEmail = async ({ username, email }) => {
  const user = await UserModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  return user;
};

export const findUserById = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

export const updateUserById = async (id, name, username, email, password) => {
  const user = await UserModel.findById(id);

  if (user) {
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    return user;
  }
};

export const removeUserById = async (id) => {
  const userRemoved = await UserModel.findByIdAndDelete(id);
  return userRemoved;
};

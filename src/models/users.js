import mongoose from "mongoose";
import DBError from "../errors/dberror.js";

const UserModel = mongoose.model("Users", {
  name: String,
  username: String,
  email: String,
  password: String,
  role: String,
});

export const createNewUser = async ({ name, username, email, password }) => {
  const checkUserRegistered = await getUserByUserNameOrEmail({
    username,
    email,
  });

  if (checkUserRegistered) {
    throw new DBError("Usuario ou senha já cadastrado.");
  }

  const newUser = new UserModel();

  newUser.name = name;
  newUser.username = username;
  newUser.email = email;
  newUser.password = password;
  newUser.role = "client";

  await newUser.save();

  return newUser;
};

export const getUserByUserNameOrEmail = async ({ username, email }) => {
  const user = await UserModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    throw new DBError("Usuario não encontrado.");
  } else {
    return user;
  }
};

export const getUserById = async (userId) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new DBError("Usuario não encontrado.");
  } else {
    return user;
  }
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
  } else {
    throw new DBError("Usuário não encontrado.");
  }
};

export const removeUserById = async (id) => {
  const userRemoved = await UserModel.findByIdAndDelete(id);

  if (!userRemoved) {
    throw new DBError("Usuario não encontrado.");
  } else {
    return userRemoved;
  }
};

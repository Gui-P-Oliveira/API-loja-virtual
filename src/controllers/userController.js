import { createToken, disableToken } from "../models/token.js";
import {
  createNewUser,
  getUserByUserNameOrEmail,
  findUserById,
  updateUserById,
  removeUserById,
} from "../models/users.js";
import UserDTO from "../views/userDTO.js";
import TokenDTO from "../views/tokenDTO.js";
import bcrypt from "bcrypt"
import { SALT } from "../constants.js";



export const registerUserController = async (request, response) => {
  const { name, username, email, password } = request.body;
  
  if (!name || !username || !email || !password) {
    response.status(406).send("Campo obrigatório não preenchido");
  }
  
  const hash = bcrypt.hashSync(password, SALT)
  const newUser = await createNewUser({ name, username, email, password: hash });
  const newUserDTO = new UserDTO(newUser);

  response.status(201).json(newUserDTO);
};

export const userLoginController = async (request, response) => {
  const { username, email, password } = request.body;
  const user = await getUserByUserNameOrEmail({ username, email });


  if (!user) {
    response.status(403).send("Unauthorized user");
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    response.status(403).send("Unauthorized password");
    return;
  }

  const token = await createToken(user._id);
  const tokenDTO = new TokenDTO(token);

  response.status(201).send(tokenDTO);
};

export const userLogoffController = async (req, res) => {
  const tokenId = req.headers.authorization;
  
  disableToken(tokenId)

  res.status(201).send('Usuário deslogado');
}

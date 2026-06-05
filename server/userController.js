import * as userRepository from "./userRepository.js";

const getAllUsers = async (c) => {
  const users = await userRepository.getAllUsers();
  return c.json(users);
};

export { getAllUsers };
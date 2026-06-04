import * as jwt from "@hono/hono/jwt";
import { hash, verify } from "scrypt";
import * as authRepository from "./authRepository.js";

const JWT_SECRET = "jwt_secret";

const register = async (c) => {
  const user = await c.req.json();
  try {
    user.password_hash = hash(user.password);
    await authRepository.create(user);
  } catch (e) {
    return c.json({ message: `Confirmation email sent to address ${user.email}.` });
  }
  return c.json({ message: `Confirmation email sent to address ${user.email}.` });
};

const login = async (c) => {
  const user = await c.req.json();

  const foundUser = await authRepository.findByEmail(user.email);
  if (!foundUser) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const isValid = verify(user.password, foundUser.password_hash);
  if (!isValid) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const payload = {
    id: foundUser.id,
    email: foundUser.email,
    exp: Math.floor(Date.now() / 1000) + 60,
  };
  const token = await jwt.sign(payload, JWT_SECRET);

  return c.json({
    message: `Welcome back ${foundUser.email}!`,
    user: { id:foundUser.id, email: foundUser.email },
    token
  });
};

export { login, register };
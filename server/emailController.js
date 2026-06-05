import * as validators from "./validators.js";
import { zValidator } from "@hono/zod-validator";

const createEmail = [
  zValidator("json", validators.emailValidator),
  async (c) => {
    const data = c.req.valid("json");
    // do something with email

    return c.json(data);
  },
];

export { createEmail };
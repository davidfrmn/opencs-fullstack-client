import { z } from "@zod/zod";

export const emailValidator = z.object({
  email: z.string().email(),
});
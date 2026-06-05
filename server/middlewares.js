import * as jwt from "@hono/hono/jwt";

const JWT_SECRET = "jwt_secret";

const authenticate = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid authorization header" }, 401);
  }

  // Drop the "Bearer " prefix to get the token
  const token = authHeader.substring(7);

  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
};

const requireAnyRole = (...requiredRoles) => {
  return async (c, next) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Authentication required" }, 401);
    }

    if (
      !user.roles || !user.roles.some((role) => requiredRoles.includes(role))
    ) {
      return c.json({ error: "Insufficient permissions" }, 403);
    }

    await next();
  };
};

export { authenticate, requireAnyRole };
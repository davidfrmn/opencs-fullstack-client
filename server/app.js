import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import * as todoController from "./todoController.js";
import * as taskController from "./taskController.js";
import * as authController from "./authController.js";
import * as userController from "./userController.js";
import * as statController from "./statController.js"
import * as middlewares from "./middlewares.js";

const app = new Hono();
app.use("/*", cors());

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

app.use("/api/todos/*", middlewares.authenticate);
app.post("/api/todos", todoController.create);
app.get("/api/todos", todoController.readAll);
app.get("/api/todos/:todoId", todoController.readOne);
app.put("/api/todos/:todoId", todoController.update);
app.delete("/api/todos/:todoId", todoController.deleteOne);

app.post("/api/todos/:todoId/tasks", taskController.create);
app.get("/api/todos/:todoId/tasks", taskController.readAll);
app.get("/api/todos/:todoId/tasks/:taskId", taskController.readOne);
app.put("/api/todos/:todoId/tasks/:taskId", taskController.update);
app.delete("/api/todos/:todoId/tasks/:taskId", taskController.deleteOne);

app.use("/api/secret", middlewares.authenticate);
app.get("/api/secret", (c) => {
  return c.json({ message: "This is a secret message!" });
});

// Add your routes here
app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

app.use("/api/profile", middlewares.authenticate);
app.get("/api/profile", (c) => {
  const user = c.get("user");
  return c.json({ email: user.email });
});

app.use("/api/admin/*", middlewares.authenticate, middlewares.requireAnyRole("ADMIN"));
app.get("/api/admin/users", userController.getAllUsers);
app.get("/api/admin/stats", statController.stats);

export default app;

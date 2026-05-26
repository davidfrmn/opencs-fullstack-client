import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

let visits = 0;
app.get("/api/visits", (c) => {
  visits++;
  return c.json({ visits });
});

// retrieving todos from database on requests to /api/todos
app.get("/api/todos", async (c) => {
  const todos = await sql`SELECT * FROM todos`;
  return c.json(todos);
});

app.get("/api/todos/:todoId", async (c) => {
    const todoId = Number(c.req.param("todoId"));
    if (!Number.isInteger(todoId)) {
        return c.json({error: "Invalid todo id"}, 400)
    }
    
    const result = await sql`SELECT * FROM todos where id = ${todoId}`;
    
    if (result.length === 0) {
        return c.json({error: "Todo not found"}, 404);
    }
    return c.json(result[0]);
});

app.get("/api/books", async (c) => {
  const result = await sql`SELECT * FROM books`;
  return c.json(result);
});

app.get("/api/books/:bookId", async (c) => {
  const id = Number(c.req.param("bookId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid book id" }, 400);
  }

  const result = await sql`SELECT *
    FROM books
    WHERE id = ${id}`;
  if (result.length === 0) {
    return c.json({ error: "Book not found" }, 404);
  }
  return c.json(result[0]);
});

app.post("/api/books", async (c) => {
  const book = await c.req.json();

  if (!book.title ||
    !book.description ||
    !book.published_at ||
    !book.page_count) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const result = await sql`INSERT INTO books
    (title, description, published_at, page_count)
    VALUES (${book.title}, ${book.description}, ${book.published_at}, ${book.page_count})
    RETURNING *;`;

  return c.json(result[0], 201);
});

export default app;
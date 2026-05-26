import * as todoRepository from './todoRepository.js';

const create = async (c) => {
  const todo = await c.req.json();
  if (!todo.name) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const newTodo = await todoRepository.create(todo);
  return c.json(newTodo,201);
};

const readAll = async (c) => {
  const todos = await todoRepository.findAll();
  return c.json(todos);
};

const readOne = async (c) => {
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const todo = await todoRepository.findById(id);

  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(todo);
};

const update = async (c) => {
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const todo = await c.req.json();
  if (!todo.name || !todo.created_at) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const updatedTodo = await todoRepository.updateById(id, todo);

  if (!updatedTodo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(updatedTodo);
};

const deleteOne = async (c) => {
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const deletedTodo = await todoRepository.deleteById(id);

  if (!deletedTodo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(deletedTodo);
};

export { create, deleteOne, readAll, readOne, update };
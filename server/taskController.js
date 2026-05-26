import * as taskRepository from './taskRepository.js';

// add controller functions here and export them

const create = async (c) => {
  const todoId = Number(c.req.param("todoId"));
  if (!Number.isInteger(todoId)) {
    return c.json({error: "Invalid todo id"}, 400);
  }

  const task = await c.req.json();
  if (!task.description) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const newTask = await taskRepository.create(todoId, task);
  return c.json(newTask,201);
};

const readAll = async (c) => {
  const todoId = Number(c.req.param("todoId"));
  if (!Number.isInteger(todoId)) {
    return c.json({error: "Invalid todo id"}, 400);
  }

  const tasks = await taskRepository.findAll(todoId);
  return c.json(tasks);
};

const readOne = async (c) => {
  /*const todoId = Number(c.req.param("todoId"));
  if (!Number.isInteger(todoId)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }
  */

  const taskId = Number(c.req.param("taskId"));
  if (!Number.isInteger(taskId)) {
    return c.json({ error: "Invalid task id" }, 400);
  }
  const task = await taskRepository.findById(taskId);

  if (!task) {
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json(task);
};

const update = async (c) => {

  const taskId = Number(c.req.param("taskId"));
  if (!Number.isInteger(taskId)) {
    return c.json({ error: "Invalid task id" }, 400);
  }
  /*
  const todoId = Number(c.req.param("todoId"));
  if (!Number.isInteger(todoId)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }
  */

  const task = await c.req.json();
  if (task.is_done == undefined || !task.description) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const updatedTask = await taskRepository.updateById(taskId, task);

  if (!updatedTask) {
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json(updatedTask);
};

const deleteOne = async (c) => {
  /*
  const todoId = Number(c.req.param("todoId"));
  if (!Number.isInteger(todoId)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }
  */
  const taskId = Number(c.req.param("taskId"));
  if (!Number.isInteger(taskId)) {
    return c.json({ error: "Invalid task id" }, 400);
  }

  const deletedTask = await taskRepository.deleteById(taskId);

  if (!deletedTask) {
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json(deletedTask);
};

export { create, deleteOne, readAll, readOne, update };

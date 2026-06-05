import * as todoRepository from "./todoRepository.js";
import * as taskRepository from "./taskRepository.js";

const stats = async (c) => {
  const totalTodos = await todoRepository.numberOfTodos();
  const totalTasks = await taskRepository.numberOfTasks();
  return c.json({ todos: totalTodos, tasks: totalTasks });
};

export { stats };
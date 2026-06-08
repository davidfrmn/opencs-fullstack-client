import postgres from "postgres";

const sql = postgres();

const isTaskOwnedByUser = async (userId, taskId) => {
  const userTodoTaskCount = await sql`
    SELECT COUNT(*) AS count
      FROM todo_tasks
      JOIN todos ON todo_tasks.todo_id = todos.id
      WHERE todo_tasks.id = ${taskId} AND todos.user_id = ${userId}`;

  if (userTodoTaskCount[0]?.count === "0") {
    return false;
  }
  return true;
};

const isTodoOwnedByUser = async (userId, todoId) => {
  const userTodoCount = await sql`
    SELECT COUNT(*) AS count
      FROM todos
      WHERE todos.id = ${todoId} AND todos.user_id = ${userId}`;

  if (userTodoCount[0]?.count === "0") {
    return false;
  }
  return true;
};

const create = async (userId, todoId, task) => {
  if (!await isTodoOwnedByUser(userId,todoId)) {
    return null;
  }

  const result = await sql`INSERT INTO todo_tasks
    (todo_id, description)
    VALUES (${todoId}, ${task.description})
    RETURNING *;`;

  return result[0];
};

const findAll = async (userId, todoId) => {
  if (!await isTodoOwnedByUser(userId,todoId)) {
    return null;
  }

  return await sql`SELECT * FROM todo_tasks
  WHERE todo_id = ${todoId};`;
};

const findById = async (userId, id) => {
  if (!await isTaskOwnedByUser(userId, id)) {
    return null;
  }

  const result = await sql`SELECT * FROM todo_tasks
  WHERE id = ${id}`;
  return result[0];
};

const updateById = async (userId, id, task) => {
  if (!await isTaskOwnedByUser(userId, id)) {
    return null;
  }

  const result = await sql`
    UPDATE todo_tasks
    SET
      description = ${task.description},
      is_done = ${task.is_done}
    WHERE id = ${id}
    RETURNING *`;

  return result[0];
};

const deleteById = async (userId, id) => {
  if (!await isTaskOwnedByUser(userId,id)) {
    return null;
  }

  const result = await sql`DELETE FROM todo_tasks
    WHERE id = ${id} RETURNING *`;
  return result[0];
};

const numberOfTasks = async () => {
  const result = await sql`SELECT COUNT(*) FROM todo_tasks`;
  return parseInt(result[0].count);
};

export { create, deleteById, findAll, findById, updateById, numberOfTasks };
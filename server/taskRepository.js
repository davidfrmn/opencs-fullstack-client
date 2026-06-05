import postgres from "postgres";

const sql = postgres();

const create = async (todoId, task) => {
  const result = await sql`INSERT INTO todo_tasks
    (todo_id, description)
    VALUES (${todoId}, ${task.description})
    RETURNING *;`;

  return result[0];
};

const findAll = async (todoId) => {
  return await sql`SELECT * FROM todo_tasks
  WHERE todo_id = ${todoId};`;
};

const findById = async (id) => {
  const result = await sql`SELECT * FROM todo_tasks
  WHERE id = ${id}`;
  return result[0];
};

const updateById = async (id, task) => {
  const result = await sql`UPDATE todo_tasks SET
      description = ${task.description},
      is_done = ${task.is_done}
    WHERE id = ${id}
    RETURNING *;`;
  return result[0];
};

const deleteById = async (id) => {
  const result = await sql`DELETE FROM todo_tasks
    WHERE id = ${id} RETURNING *`;
  return result[0];
};

const numberOfTasks = async () => {
  const result = await sql`SELECT COUNT(*) FROM todo_tasks`;
  return parseInt(result[0].count);
};

export { create, deleteById, findAll, findById, updateById, numberOfTasks };
import postgres from "postgres";

const sql = postgres();

const create = async (userId, todo) => {
  const result = await sql`INSERT INTO todos (name, user_id, created_at)
    VALUES (${todo.name}, ${userId}, NOW())
    RETURNING *`;

  return result[0];
};

const deleteById = async (userId, id) => {
  const result = await sql`
  DELETE FROM todos 
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *`;

  return result[0];
};

const findAll = async (userId) => {
  return await sql`
  SELECT * FROM todos
    WHERE user_id = ${userId}
    ORDER BY created_at DESC`;
};

const findById = async (userId, id) => {
  const result = await sql`
  SELECT * FROM todos 
    WHERE id = ${id} AND user_id = ${userId}`;

  return result[0];
};

const updateById = async (userId, id, todo) => {
  const result = await sql`
  UPDATE todos
    SET name = ${todo.name}, created_at = ${todo.created_at}
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *`;

  return result[0];
};

const numberOfTodos = async () => {
  const result = await sql`
  SELECT COUNT(*) from todos
  `;

  return parseInt(result[0].count);
};

export { create, deleteById, findAll, findById, updateById, numberOfTodos };
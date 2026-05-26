import postgres from "postgres";

const sql = postgres();

const create = async (todo) => {
  const result = await sql`INSERT INTO todos (name, created_at)
    VALUES (${todo.name}, NOW())
    RETURNING *`;

  return result[0];
};

const deleteById = async (id) => {
  const result = await sql`DELETE FROM todos WHERE id = ${id} RETURNING *`;

  return result[0];
};

const findAll = async () => {
  return await sql`SELECT * FROM todos`;
};

const findById = async (id) => {
  const result = await sql`SELECT * FROM todos WHERE id = ${id}`;

  return result[0];
};

const updateById = async (id, todo) => {
  const result = await sql`UPDATE todos
    SET name = ${todo.name}, created_at = ${todo.created_at}
    WHERE id = ${id}
    RETURNING *`;

  return result[0];
};

export { create, deleteById, findAll, findById, updateById };
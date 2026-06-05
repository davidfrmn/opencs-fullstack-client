import postgres from "postgres";

const sql = postgres();

const create = async (user) => {
  const result = await sql`
    INSERT INTO users (email, password_hash)
    VALUES (${user.email}, ${user.password_hash})
    RETURNING id, email;
  `;

  return result[0];
};

const findByEmail = async (email) => {
  const result = await sql`
    SELECT * FROM users WHERE lower(trim(email)) = lower(trim(${email}))
  `;
  return result[0];
};

const getUserRoles = async (userId) => {
  const result = await sql`
    SELECT role FROM user_roles WHERE user_id = ${userId}
  `;

  return result.map((row) => row.role);
};

export { create, findByEmail, getUserRoles };
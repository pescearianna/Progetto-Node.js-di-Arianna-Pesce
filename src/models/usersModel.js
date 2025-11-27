const { pool } = require("../../database");

async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0]; //sennò mi torna un array con un oggetto
}

async function createUser(name, firstName, email) {
  await pool.query(
    "INSERT INTO users (name, first_name, email) VALUES (?,?,?)",
    [name, firstName, email]
  );
}

async function updateUser(id, name, firstName, email) {
  await pool.query(
    "UPDATE users SET name=?, first_name=?, email=? WHERE id=?",
    [name, firstName, email, id]
  );
}

async function deleteUser(id) {
  await pool.query("DELETE FROM users WHERE id=?", [id]);
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };

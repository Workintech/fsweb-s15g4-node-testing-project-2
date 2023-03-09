const db = require("../../data/db-config");

function getAll() {
  return db("starwars");
}

function getById(id) {
  return db("starwars").where({ id }).first();
}
async function insert(character) {
  const [id] = await db("starwars").insert(character);
  return getById(id);
}
module.exports = {
  getAll,
  getById,
  insert,
};

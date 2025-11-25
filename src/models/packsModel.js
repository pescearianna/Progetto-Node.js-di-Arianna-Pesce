const { pool } = require('../../database');

async function getAllPacks() {
  const [rows] = await pool.query('SELECT * FROM packs');
  return rows;
}

async function getPack(id){
  const [rows] = await pool.query('SELECT * FROM packs WHERE id = ?', [id])
    return rows[0] //sennò mi torna un array con un oggetto
}

async function createPack(name, destination, price){
  await pool.query('INSERT INTO packs (name, destination, price) VALUES (?,?,?)', [name, destination, price])
}

async function updatePack(id, name, destination, price){
  await pool.query('UPDATE packs SET name=?, destination=?, price=? WHERE id=?', [name, destination, price, id]);
}

async function deletePack(id){
  await pool.query('DELETE FROM packs WHERE id=?', [id])
}

module.exports = { getAllPacks, getPack, createPack, updatePack, deletePack };
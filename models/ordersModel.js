const { pool } = require('../database');

async function getAllOrders() {
  const [rows] = await pool.query(`SELECT 
  orders.id AS order_id,
  orders.date,
  users.name AS user_name,
  users.first_name AS user_firstname,
  packs.name AS pack_name,
  order_items.quantity
FROM orders
LEFT JOIN users 
  ON orders.by_user = users.id
LEFT JOIN order_items 
  ON orders.id = order_items.order_id
  
LEFT JOIN packs
  ON order_items.pack_id = packs.id;`);
  return rows;
}

async function getOrder(id){
  const [rows] = await pool.query(`SELECT 
  orders.id AS order_id,
  orders.date,
  orders.by_user AS user_id,
  users.name AS user_name,
  users.first_name AS user_firstname,
  packs.name AS pack_name,
  order_items.pack_id AS pack_id,
  order_items.quantity,
  order_items.id AS int_id
FROM orders
LEFT JOIN users 
  ON orders.by_user = users.id
LEFT JOIN order_items 
  ON orders.id = order_items.order_id
LEFT JOIN packs
  ON order_items.pack_id = packs.id WHERE order_id = ?`, [id])
    return rows; //sennò mi torna un array con un oggetto
}

async function filteredOrder(filterDateStart, filterDateEnd, filterPack){
  const conditions = [];
  const values=[]
 if (filterDateStart) {
    conditions.push('orders.date >= ?');
    values.push(filterDateStart);
  }
  if (filterDateEnd) {
    conditions.push('orders.date <= ?');
    values.push(filterDateEnd);
  }

if (filterPack) {
  conditions.push('packs.name = ?');
  values.push(filterPack);
}

let sql = `
    SELECT 
      orders.id AS order_id,
      orders.date,
      users.name AS user_name,
      users.first_name AS user_firstname,
      packs.name AS pack_name,
      order_items.quantity
      
    FROM orders
    LEFT JOIN users ON orders.by_user = users.id
    LEFT JOIN order_items ON orders.id = order_items.order_id
    LEFT JOIN packs ON order_items.pack_id = packs.id
  `;

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  const [rows] = await pool.query(sql, values);

  return rows;}







async function createOrder(byUser, quantity, packId){
    const connection = await pool.getConnection()
   
    await connection.beginTransaction();
    const [newOrder] = await connection.query(
      'INSERT INTO orders (by_user, date) VALUES (?, NOW())',
      [byUser]
    );

    const orderId = newOrder.insertId

 
    connection.query('INSERT INTO order_items (order_id, quantity, pack_id) VALUES (?,?,?)', [orderId, quantity, packId]);
       
      await connection.commit()
       return orderId; // così puoi restituire l’id dell’ordine creato
  
}

async function updateOrderMain(id, byUser){
  const connection = await pool.getConnection()

    await connection.beginTransaction();

    await connection.query(
      'UPDATE orders SET by_user=?, date=NOW() WHERE id=?',
      [byUser, id]
    );
  
    await connection.commit()
}

  async function updateOrderDetails(id, itemId, packId, quantity){
    const connection = await pool.getConnection()
    try {
    await connection.beginTransaction();
    await connection.query('UPDATE order_items SET pack_id = ?, quantity = ? WHERE order_id=? AND id=?', [ packId, quantity, id, itemId])
  await connection.commit()
       
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release(); // Rilascia la connessione al pool
  }}




async function deleteOrder(id){
  await pool.query('DELETE FROM order_items WHERE order_id=?', [id])
  const [result] = await pool.query('DELETE FROM orders WHERE id=?', [id])
  return result.affectedRows;
}




module.exports = { getAllOrders, getOrder, createOrder, updateOrderDetails, updateOrderMain, deleteOrder, filteredOrder };
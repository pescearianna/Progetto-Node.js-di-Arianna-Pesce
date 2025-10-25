const OrdersModel = require('../../models/ordersModel');
const PacksModel = require('../../models/packsModel');

async function getAllOrders(req, res) {
    try{
  const filterDateStart = req.query.dateStart || '';
  const filterDateEnd = req.query.dateEnd || '';
  const filterPack = req.query.pack || '';

  // Prendi gli ordini filtrati (o tutti se i filtri sono vuoti)
  const rows = await OrdersModel.filteredOrder(
    filterDateStart || '1970-01-01',
    filterDateEnd || '2100-12-31',
    filterPack || null
  );

  // Raggruppa i risultati per ordine
  const ordersMap = {};
  rows.forEach(row => {
    if (!ordersMap[row.order_id]) {
      ordersMap[row.order_id] = {
        order_id: row.order_id,
        date: row.date,
        user_name: row.user_name,
        user_firstname: row.user_firstname,
        packs: []
      };
    }
    if (row.pack_name) {
      ordersMap[row.order_id].packs.push({
        name: row.pack_name,
        quantity: row.quantity
      });
    }
  });
  const orders = Object.values(ordersMap);

  // Prendi tutti i pacchetti per il menu a tendina
  const packs = await PacksModel.getAllPacks();

  // Passa tutto alla view
  res.render('orders', { orders, packs, filterDateStart, filterDateEnd, filterPack });
  } catch (error) {
    res.status(500).send('Errore nel caricamento degli ordini');
  }
}



async function getOrder(req, res) {
  const id = req.params.id;
  const order = await OrdersModel.getOrder(id);
  res.status(200).json({ success: true, data: order });
}   


async function updateOrder(req, res) { const id = req.params.id
    const {byUser, quantity, packId} = req.body
    const order = await OrdersModel.getOrder(id)
        if (!order) {
            return res.status(404).json({ success: false, message: "Order non found" });
        }

    const updateByUser = byUser ? byUser : order.byUser
        const updateQuantity = quantity ? quantity : order.quantity
        
        const updatePackId = packId ? packId : order.packId

        await OrdersModel.updateOrder(id, updateByUser, updateQuantity,  updatePackId)
        const updatedOrder = await OrdersModel.getOrder(id)
    
    res.status(200).json({success:true, data: updatedOrder})
}



async function createOrder(req, res) {
  const { byUser, quantity, packId } = req.body;
  await OrdersModel.createOrder(byUser, quantity, packId);
  const orders = await OrdersModel.getAllOrders();
  res.status(201).json({ data: orders });
}

async function deleteOrder(req, res) {
  try {
  const id = req.params.id;
  const order = await OrdersModel.deleteOrder(id);
      
          if (!order) return res.status(404).redirect('/404');

  print('Order deleted');
  res.status(204).redirect('/orders');
  } catch (error) {
      print('Error deleting order:', error);
      res.status(500).redirect('/orders');
  }
}

module.exports = { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder};
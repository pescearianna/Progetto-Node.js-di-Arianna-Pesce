const OrdersModel = require('../../models/ordersModel');


async function getAllOrders(req, res) {
    try {
    const { dateStart, dateEnd, pack } = req.query;
    const orders = await OrdersModel.filteredOrder(dateStart, dateEnd, pack);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}



async function getOrder(req, res) {
    try {
        const id = req.params.id;
        const order = await OrdersModel.getOrder(id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

  


 async function updateOrder(req, res) { 
    const id = req.params.id
     try{
         const {byUser, quantity, packId} = req.body
     const order = await OrdersModel.getOrder(id)
         if (!order) {
             return res.status(404).json({ success: false, message: "Order not found" });
         }

         const updateByUser = byUser ? byUser : order.byUser
         const updateQuantity = quantity ? quantity : order.quantity
        
         const updatePackId = packId ? packId : order.packId

         await OrdersModel.updateOrder(id, updateByUser, updateQuantity,  updatePackId)
         const updatedOrder = await OrdersModel.getOrder(id)
    
     res.status(200).json({success:true, data: updatedOrder})
     } catch (error) {
         res.status(500).json({ success: false, message: error.message });
     }
 }



async function createOrder(req, res) {
    try {
  const { byUser, quantity, packId } = req.body;
  await OrdersModel.createOrder(byUser, quantity, packId);
  const orders = await OrdersModel.getAllOrders();
  res.status(201).json({ success:true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function deleteOrder(req, res) {
    try {
    const id = req.params.id;
    const order = await OrdersModel.deleteOrder(id);
    
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        
    res.status(200).json({ success: true, message: `Order ${id} deleted` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder};
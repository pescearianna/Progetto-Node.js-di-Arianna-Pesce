const OrdersModel = require("../../models/ordersModel");
const { updatePack } = require("../../models/packsModel");

async function getAllOrders(req, res) {
  try {
    const dateStart = req.query.dateStart || "";
    const dateEnd = req.query.dateEnd || "";
    const pack = req.query.pack || "";
    const user = req.query.user || "";

    const orders = await OrdersModel.filteredOrder(
      dateStart || "1970-01-01",
      dateEnd || "2100-12-31",
      pack || null,
      user || null
    );

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const id = req.params.id;
    const rows = await OrdersModel.getOrder(id);

    if (!rows || rows.length === 0)
      return res
        .status(404)
        .render("error.ejs", { message: "Order not found" });

    const order = {
      order_id: rows[0].order_id,
      date: rows[0].date,
      user_id: rows[0].user_id,
      user_name: rows[0].user_name,
      user_firstname: rows[0].user_firstname,
      packs: rows.map((r) => ({
        name: r.pack_name,
        quantity: r.quantity,
        pack_id: r.pack_id,
        int_id: r.int_id,
      })),
    };

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateOrder(req, res) {
  const id = req.params.id;
  try {
    const { byUser, packs } = req.body;
    const order = await OrdersModel.getOrder(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const updateByUser = byUser ? byUser : order.user_id;

    //ripetere l'azione per ogni pacchetto del array
    //tornare il nome del pacchetto e la quantità aggiornata
    for (const packDetails of packs) {
      const { unicum, packId, quantity } = packDetails;
      //Per ogni elemento nell'array packs, dire al db di aggiornare quell'elemento specifico nell'ordine.

      const itemId = unicum;
      await OrdersModel.updateOrderDetails(id, itemId, packId, quantity);
    }

    await OrdersModel.updateOrderMain(id, updateByUser);

    const updatedOrder = await OrdersModel.getOrder(id);

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createOrder(req, res) {
  try {
    const { byUser, quantity, packId } = req.body;
    if (!byUser || !quantity || !packId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    await OrdersModel.createOrder(byUser, quantity, packId);
    const orders = await OrdersModel.getAllOrders();
    res.status(201).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    const id = req.params.id;

    //elimina el item + orden
    const deleted = await OrdersModel.deleteOrder(id);

    if (deleted === 0)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: `Order ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

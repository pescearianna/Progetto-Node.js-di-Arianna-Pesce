const OrdersModel = require("../../models/ordersModel");
const PacksModel = require("../../models/packsModel");
const UsersModel = require("../../models/usersModel");

async function getAllOrders(req, res) {
  try {
    const filterDateStart = req.query.dateStart || "";
    const filterDateEnd = req.query.dateEnd || "";
    const filterPack = req.query.pack || "";
    const filterUser = req.query.user || "";

    const rows = await OrdersModel.filteredOrder(
      filterDateStart || "1970-01-01",
      filterDateEnd || "2100-12-31",
      filterPack || null,
      filterUser || null
    );

    // Raggruppa i risultati
    const ordersMap = {};
    rows.forEach((row) => {
      if (!ordersMap[row.order_id]) {
        ordersMap[row.order_id] = {
          order_id: row.order_id,
          created_at: row.created_at,
          user_name: row.user_name,
          user_firstname: row.user_firstname,
          packs: [],
        };
      }
      if (row.pack_name) {
        ordersMap[row.order_id].packs.push({
          name: row.pack_name,
          quantity: row.quantity,
        });
      }
    });
    const orders = Object.values(ordersMap);

    // per il menu a tendina
    const packs = await PacksModel.getAllPacks();
    const users = await UsersModel.getAllUsers();

    res.render("orders", {
      orders,
      packs,
      filterDateStart,
      filterDateEnd,
      filterPack,
      filterUser,
      users,
    });
  } catch (error) {
    console.error("Order ERROR:", error); 
    res.status(500).render("500.ejs");
  }
}

async function getOrder(req, res) {
  try {
    const id = req.params.id;
    id
    const rows = await OrdersModel.getOrder(id);

    const filterPack = req.query.pack || "";
    const filterUser = req.query.user || "";

    if (!rows || rows.length === 0)
      return res
        .status(404)
        .render("error.ejs", { message: "Order not found" });

    const order = {
      order_id: rows[0].order_id,
      created_at: rows[0].created_at,
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

    const users = await UsersModel.getAllUsers();
    const packs = await PacksModel.getAllPacks();
    const orders = await OrdersModel.getAllOrders();

    res.render("order.ejs", {
      order,
      orders,
      users,
      filterPack,
      filterUser,
      packs,
    });
  } catch (error) {
    console.error("Order ERROR:", error); 
    res.status(500).render("500.ejs");
  }
}

async function createOrder(req, res) {
  try {
    const { byUser, quantity, packId } = req.body;
    await OrdersModel.createOrder(byUser, quantity, packId);
    res.redirect("/orders");
  } catch (error) {
    console.error("Order ERROR:", error); 
    res.status(500).render("500.ejs");
  }
}

module.exports = { getAllOrders, getOrder, createOrder };

const express = require("express");


const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const port = process.env.PORT || 3002;

const packsRoutes = require("./routes/views/packs");
const usersRoutes = require("./routes/views/users");
const ordersRoutes = require("./routes/views/orders");

// API REST
const packsApiRoutes = require("./routes/api/packs");
const usersApiRoutes = require("./routes/api/users");
const ordersApiRoutes = require("./routes/api/orders");

const path = require("path");

// STATIC FILES (public)
app.use(express.static(path.join(__dirname, "public")));

// VIEWS CONFIG
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// HOME
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// ROUTE FRONT
app.use("/packs", packsRoutes);
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);

// ROUTE API
app.use("/api/packs", packsApiRoutes);
app.use("/api/users", usersApiRoutes);
app.use("/api/orders", ordersApiRoutes);

app.listen(port);

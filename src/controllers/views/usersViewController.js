const UsersModel = require("../../models/usersModel");

async function getAllUsers(req, res) {
  try {
    const users = await UsersModel.getAllUsers();
    res.render("users.ejs", { data: users });
  } catch (error) {
    console.error("User ERROR:", error); 
    res.status(500).render("500.ejs");
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const user = await UsersModel.getUser(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).render("user.ejs", { user: user });
  } catch (error) {
    console.error("User ERROR:", error); 
    res.status(500).render("500.ejs");
  }
}

async function createUser(req, res) {
  try {
    const { name, firstName, email } = req.body;
    await UsersModel.createUser(name, firstName, email);
    res.redirect("/users");
  } catch (error) {
    console.error("User ERROR:", error); 
    res.status(500).render("500.ejs");
  }
}

module.exports = { getAllUsers, getUser, createUser };

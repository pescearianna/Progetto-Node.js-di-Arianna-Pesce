const UsersModel = require("../../models/usersModel");

async function getAllUsers(req, res) {
  try {
    const users = await UsersModel.getAllUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { name, firstName, email } = req.body;
    if (!name || !firstName || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    function validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    await UsersModel.createUser(name, firstName, email);

    const users = await UsersModel.getAllUsers();
    res.status(201).json({ data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { name, firstName, email } = req.body;
    const user = await UsersModel.getUser(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updateName = name ? name : user.name;
    const updateFirstName = firstName ? firstName : user.firstName;
    const updateEmail = email ? email : user.email;
    function validateEmail(updateEmail) {
      return String(updateEmail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    if (!validateEmail(updateEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    await UsersModel.updateUser(id, updateName, updateFirstName, updateEmail);

    const updatedUser = await UsersModel.getUser(id);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const user = await UsersModel.deleteUser(id);
    if (user === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: `User ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };

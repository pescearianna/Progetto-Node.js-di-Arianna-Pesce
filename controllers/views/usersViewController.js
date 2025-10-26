const UsersModel = require('../../models/usersModel');

async function getAllUsers(req, res) {
    try {
    const users = await UsersModel.getAllUsers();
    res.render('users.ejs', {data:users});
    } catch (error) {
    res.status(500).render('500.ejs');
    }}

 async function getUser(req, res) {
     try {
         const id = req.params.id;   
         const user = await UsersModel.getUser(id);
         if (!user) return res.status(404).json({ success: false, message: 'User not found' });
         res.status(200).render('user.ejs', {user:user});
     } catch (error) {
         res.status(500).render('500.ejs');
     }} 


async function createUser(req, res) {
    try {
  const { name, firstName, email } = req.body;  
    await UsersModel.createUser(name, firstName, email);
    res.redirect('/users');
    } catch (error) {
        res.status(500).render('500.ejs')   ;
    }}

//     async function updateUser(req, res) {
//         try{
//     const id = req.params.id;
//     const {name, firstName, email} = req.body
//     const user = await UsersModel.getUser(id)   
//     if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const updateName = name ? name : user.name
//     const updateFirstName = firstName ? firstName : user.firstName
//     const updateEmail = email ? email : user.email

//     await UsersModel.updateUser(id, updateName, updateFirstName, updateEmail)

//     const updatedUser = await UsersModel.getUser(id)    
//     res.status(200).json({success:true, data: updatedUser})
// } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
// }}



// async function deleteUser(req, res) {
//     try {
//     const id = req.params.id;   
//     const user = await UsersModel.deleteUser(id);
//         if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//     res.status(204).json({ success: true, message: `User ${id} deleted` });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }}
    
module.exports = { getAllUsers, getUser, createUser};


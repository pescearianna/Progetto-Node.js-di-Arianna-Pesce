const express = require('express')
const bodyParser = require('body-parser') 

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



const port = 3002

const packsRoutes = require('./routes/views/packs');
const usersRoutes = require('./routes/views/users');
const ordersRoutes = require('./routes/views/orders');

//API REST
const packsApiRoutes = require('./routes/api/packs');
const usersApiRoutes = require('./routes/api/users');
const ordersApiRoutes = require('./routes/api/orders');




app.set('view engine', 'ejs');

app.use(express.json())

const path = require("path");

// middleware per i file statici
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    res.render('index.ejs')
 })

 


// ROUTE FRONT (como lo ve en navegador, lo que es realmente)
app.use('/packs', packsRoutes);
app.use('/users', usersRoutes)
app.use('/orders', ordersRoutes);

// ROUTE API
app.use('/api/packs', packsApiRoutes);
app.use('/api/users', usersApiRoutes);   
app.use('/api/orders', ordersApiRoutes);




// 


// app.get('/', async (req, res) => {
//     res.json({ message: 'API Turismo Sostenibile attiva 🚀' })}
// )


// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Something is not working!')
// })

app.listen(port)
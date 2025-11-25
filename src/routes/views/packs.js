const express = require('express');
const router = express.Router();

const packsViewController = require('../../controllers/views/packsViewController');


router.get('/', packsViewController.getAllPacks)

router.get('/:id', packsViewController.getPack)

router.post('/', packsViewController.createPack)


// NO SIVEN ESTOS DOS PORQUE LO MANEJA LA API!!!!
//router.put('/:id', packsViewController.updatePack)


// router.delete('/:id', packsViewController.deletePack)



// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/views/packs.html')
// })



// router.get('/', async (req, res) => {
//     const packs = await getAllPacks()
//     res.render('packs.ejs', {data:packs})
//     // res.status(200).json({data:packs})
//     }
// )

// router.get('/:id', async (req, res) => {
//     const id = req.params.id
//     const pack = await getPack(id)
//     res.status(200).json({success:true, data:pack})
//     }
// )

// router.post('/', async (req, res) => {
//   let name = req.body.name
//     let destination = req.body.destination
//     let price = req.body.price
//     await createPack(name, destination, price)

//  res.redirect('/packs')
// })


// router.put('/:id', async (req,res)=>{
//     const id = req.params.id
//     const {name, destination, price} = req.body
//     const pack = await getPack(id)
//         if (!pack) {
//             return res.status(404).json({ success: false, message: "Pacchetto non trovato" });
//         }

//         const updateName = name ? name : pack.name
//         const updateDestination = destination ? destination : pack.destination
//         const updatePrice = price ? price : pack.price

//         await updatePack(id, updateName, updateDestination, updatePrice)
//         const updatedPack = await getPack(id)
    
//     res.status(200).json({success:true, data: updatedPack})
// })


// router.delete('/:id', async (req,res) => {
//     try {
//     const id = req.params.id
//     await deletePack(id)
//     res.status(200).json({ success: true, message: `Pack ${id} eliminato` })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione' })
//   }
// })



module.exports = router;
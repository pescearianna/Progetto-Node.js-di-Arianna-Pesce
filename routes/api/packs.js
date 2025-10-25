const express = require('express');
const router = express.Router();
const packsApiController = require('../../controllers/api/packsApiController');




// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/views/packs.html')
// })



router.get('/', packsApiController.getAllPacks)

router.get('/:id', packsApiController.getPack)

router.post('/', packsApiController.createPack)


router.put('/:id', packsApiController.updatePack)


router.delete('/:id', packsApiController.deletePack)



module.exports = router;
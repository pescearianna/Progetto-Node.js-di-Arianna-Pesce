const PacksModel = require('../../models/packsModel');


async function getAllPacks(req,res) {
    try{
        const packs = await PacksModel.getAllPacks()
        res.status(200).json({data:packs})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getPack(req, res) { 
    try {
        const id = req.params.id
        const pack = await PacksModel.getPack(id)
        if (!pack) return res.status(404).json({ success: false, message: 'Pack not found' });
        res.status(200).json({ success: true, data: pack });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


async function createPack(req, res) {
    try {
        const name = req.body.name
        const destination = req.body.destination
        const price = req.body.price
        if (!name || !destination || !price) {
        return res.status(400).json({ success:false, message: 'Tutti i campi sono obbligatori.' });
        }
        const packs = await PacksModel.createPack(name, destination, price);
        res.status(201).json({ success:true, data: packs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



async function updatePack(req, res) {
    try{
    const id = req.params.id
    const {name, destination, price} = req.body
    const pack = await PacksModel.getPack(id)
        if (!pack) {
            return res.status(404).json({ success: false, message: "Pacchetto non trovato" });
        }

       
        const updateName = name ? name : pack.name
        const updateDestination = destination ? destination : pack.destination
        const updatePrice = price ? price : pack.price

        await PacksModel.updatePack(id, updateName, updateDestination, updatePrice)
        const updatedPack = await PacksModel.getPack(id)
    
    res.status(200).json({success:true, data: updatedPack})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function deletePack(req, res) {
    try {
    const id = req.params.id
    await PacksModel.deletePack(id)
    res.status(200).json({ success: true, message: `Pack ${id} eliminato` })
  } catch (err) {
    
    res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione' })
  }
}

module.exports = { getAllPacks, getPack, createPack, updatePack, deletePack};

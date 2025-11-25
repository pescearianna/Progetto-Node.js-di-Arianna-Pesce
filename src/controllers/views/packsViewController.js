const PacksModel = require('../../models/packsModel');

async function getAllPacks(req, res) {
    try{
        const packs = await PacksModel.getAllPacks();
        res.render('packs.ejs', {data:packs});
    } catch (error) {
        res.status(500).render('500.ejs');
    }
}

async function getPack(req, res) { 
    try {
        const id = req.params.id;
        const pack = await PacksModel.getPack(id);
        if (!pack) return res.status(404).render('404.ejs');
        res.status(200).render('pack.ejs', {data:pack});
    } catch (error) {
        res.status(500).render('500.ejs');
    }}


async function createPack(req, res) {
        try {
        const name = req.body.name
        const destination = req.body.destination
        const price = req.body.price
        if (!name || !destination || !price) {
             const packs = await PacksModel.getAllPacks();

        return res.status(400).render('packs.ejs', { 
        data: packs,
        alertMessage: 'Tutti i campi sono obbligatori.'
      });
    }
        await PacksModel.createPack(name, destination, price);
        res.redirect('/packs');
            } catch (error) {
                res.status(500).render('500.ejs');
    }
}
        

// NO SIVEN ESTOS DOS PORQUE LO MANEJA LA API!!!!
// async function updatePack(req, res) {
//     try{
//     const id = req.params.id
//     const {name, destination, price} = req.body
//     const pack = await PacksModel.getPack(id)
//         if (!pack) {
//             return res.status(404).render('404.ejs');
//         }

//         //  if (!name && !destination && !price) {
//         // return res.status(400).render('packs.ejs', { message: 'Inserisci almeno un campo da aggiornare.' })
//         // }


//         const updateName = name ? name : pack.name
//         const updateDestination = destination ? destination : pack.destination
//         const updatePrice = price ? price : pack.price

//         await PacksModel.updatePack(id, updateName, updateDestination, updatePrice)
//         const updatedPack = await PacksModel.getPack(id)
    
//         res.status(200).redirect('/packs')
//     } catch (error) {
         
//             res.status(500).render('500.ejs', { message: 'Errore del server.' })
        
//         }
// }


// async function deletePack(req, res) {
//     try {
//     const id = req.params.id
//     await PacksModel.deletePack(id)
//     res.status(200).redirect('/packs')
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione' })
//   }
// }

module.exports = { getAllPacks, getPack, createPack};

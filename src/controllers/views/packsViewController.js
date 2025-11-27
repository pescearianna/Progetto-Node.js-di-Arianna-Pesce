const PacksModel = require("../../models/packsModel");

async function getAllPacks(req, res) {
  try {
    const packs = await PacksModel.getAllPacks();
    res.render("packs.ejs", { data: packs });
  } catch (error) {
    res.status(500).render("500.ejs");
  }
}

async function getPack(req, res) {
  try {
    const id = req.params.id;
    const pack = await PacksModel.getPack(id);
    if (!pack) return res.status(404).render("404.ejs");
    res.status(200).render("pack.ejs", { data: pack });
  } catch (error) {
    res.status(500).render("500.ejs");
  }
}

async function createPack(req, res) {
  try {
    const name = req.body.name;
    const destination = req.body.destination;
    const price = req.body.price;
    if (!name || !destination || !price) {
      const packs = await PacksModel.getAllPacks();

      return res.status(400).render("packs.ejs", {
        data: packs,
        alertMessage: "Tutti i campi sono obbligatori.",
      });
    }
    await PacksModel.createPack(name, destination, price);
    res.redirect("/packs");
  } catch (error) {
    res.status(500).render("500.ejs");
  }
}

module.exports = { getAllPacks, getPack, createPack };

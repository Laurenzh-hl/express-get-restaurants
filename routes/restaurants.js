const { Router } = require("express");
const Restaurant = require("../models/Restaurant.js");
const router = Router();

router.get("/", async function(req, res) {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

router.get("/:id", async function(req, res) {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
})

router.post("/", async function(req, res) {
    const restaurant = await Restaurant.create(req.body);
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

router.put("/:id", async function(req, res) {
    const updatedRest = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(updatedRest);
})

router.delete("/:id", async function(req, res) {
    const deletedRest = await Restaurant.destroy({where: {id: req.params.id}});
    res.json(deletedRest);
})

module.exports = router;
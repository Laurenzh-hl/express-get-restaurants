const { Router } = require("express");
const Restaurant = require("../models/Restaurant.js");
const router = Router();
const { check, validationResult } = require("express-validator");

router.get("/", async function(req, res) {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

router.get("/:id", async function(req, res) {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
})

router.post("/", [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
    check("name").isLength({ min: 10, max:30 })
], async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({error: errors.array()})
    } else {
    const restaurant = await Restaurant.create(req.body);
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
    }
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
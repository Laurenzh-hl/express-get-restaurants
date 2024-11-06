const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const router = require("../routes/restaurants.js");
app.use("/restaurants", router);

// app.get("/restaurants", async function(req, res) {
//     const restaurants = await Restaurant.findAll();
//     res.json(restaurants);
// })

// app.get("/restaurants/:id", async function(req, res) {
//     const restaurant = await Restaurant.findByPk(req.params.id);
//     res.json(restaurant);
// })

// app.post("/restaurants", async function(req, res) {
//     const restaurant = await Restaurant.create(req.body);
//     res.json(restaurant);
// })

// app.put("/restaurants/:id", async function(req, res) {
//     const updatedRest = await Restaurant.update(req.body, {where: {id: req.params.id}});
//     res.json(updatedRest);
// })

// app.delete("/restaurants/:id", async function(req, res) {
//     const deletedRest = await Restaurant.destroy({where: {id: req.params.id}});
//     res.json(deletedRest);
// })


module.exports = app;
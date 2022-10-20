const express = require("express");
const router = express.Router();

const controller = require("../controllers/items.controller");
router.post("/", controller.addItem);
router.get("/", controller.getItems);
router.put("/:id", controller.updateItem);
router.put("/quantity/:id", controller.updateQuantity);
router.delete("/:id", controller.deleteItem);

module.exports = router;

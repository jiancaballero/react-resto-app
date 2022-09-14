const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart.controller");

router.get("/", controller.getCart);
router.post("/:id", controller.addCart);
router.put("/:id", controller.updateCartQuantity);
router.delete("/:id", controller.deleteCart);

module.exports = router;

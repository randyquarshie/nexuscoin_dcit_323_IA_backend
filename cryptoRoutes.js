const express = require("express");
const router = express.Router();
const cryptoController = require("./cryptoController");

// Public routes
router.get("/", cryptoController.getAllCryptos);
router.get("/gainers", cryptoController.getTopGainers);
router.get("/new", cryptoController.getNewListings);
router.get("/:id", cryptoController.getCryptoById);

// POST route for adding new crypto
router.post("/", cryptoController.addCrypto);

// PUT and DELETE routes (optional admin features)
router.put("/:id", cryptoController.updateCrypto);
router.delete("/:id", cryptoController.deleteCrypto);

module.exports = router;

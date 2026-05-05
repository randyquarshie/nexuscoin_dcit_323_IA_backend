const Crypto = require("./Crypto");

// Get all cryptocurrencies
exports.getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cryptocurrencies",
      error: error.message,
    });
  }
};

// Get top gainers (sorted by change24h descending)
exports.getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 }).limit(10);
    res.json({
      success: true,
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch top gainers",
      error: error.message,
    });
  }
};

// Get new listings (most recently added)
exports.getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.json({
      success: true,
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch new listings",
      error: error.message,
    });
  }
};

// Add new cryptocurrency
exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validation
    if (!name || !symbol || price === undefined || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, symbol, price, and image",
      });
    }

    // Check if crypto already exists
    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(409).json({
        success: false,
        message: "Cryptocurrency with this symbol already exists",
      });
    }

    // Create new crypto
    const crypto = await Crypto.create({
      name,
      symbol: symbol.toUpperCase(),
      price: parseFloat(price),
      image,
      change24h: change24h !== undefined && change24h !== "" ? Number(change24h) : 0,
    });

    res.status(201).json({
      success: true,
      message: "Cryptocurrency added successfully",
      data: crypto,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Cryptocurrency with this name or symbol already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add cryptocurrency",
      error: error.message,
    });
  }
};

// Get single cryptocurrency by ID
exports.getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);
    
    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: "Cryptocurrency not found",
      });
    }

    res.json({
      success: true,
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cryptocurrency",
      error: error.message,
    });
  }
};

// Update cryptocurrency
exports.updateCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (symbol) updates.symbol = symbol.toUpperCase();
    if (price !== undefined) updates.price = parseFloat(price);
    if (image) updates.image = image;
    if (change24h !== undefined) updates.change24h = change24h;

    const crypto = await Crypto.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    
    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: "Cryptocurrency not found",
      });
    }

    res.json({
      success: true,
      message: "Cryptocurrency updated successfully",
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cryptocurrency",
      error: error.message,
    });
  }
};

// Delete cryptocurrency
exports.deleteCrypto = async (req, res) => {
  try {
    const crypto = await Crypto.findByIdAndDelete(req.params.id);
    
    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: "Cryptocurrency not found",
      });
    }

    res.json({
      success: true,
      message: "Cryptocurrency deleted successfully",
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cryptocurrency",
      error: error.message,
    });
  }
};

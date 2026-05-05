// Mock in-memory database for development when MongoDB is not available
const bcrypt = require("bcryptjs");

class MockDatabase {
  constructor() {
    this.users = [];
    this.cryptos = [];
    this.nextUserId = 1;
    this.nextCryptoId = 1;
  }

  // User operations
  async createUser(name, email, hashedPassword) {
    const user = {
      _id: String(this.nextUserId++),
      name,
      email,
      password: hashedPassword,
      balance: 1000.00,
      createdAt: new Date(),
    };
    this.users.push(user);
    return { ...user, password: undefined };
  }

  async findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  async findUserById(id) {
    const user = this.users.find(u => u._id === String(id));
    return user ? { ...user, password: undefined } : null;
  }

  async findUserByIdWithPassword(id) {
    return this.users.find(u => u._id === String(id));
  }

  async updateUserBalance(id, newBalance) {
    const user = this.users.find(u => u._id === String(id));
    if (user) {
      user.balance = newBalance;
    }
    return user;
  }

  // Crypto operations
  async createCrypto(name, symbol, price, image, change24h) {
    const crypto = {
      _id: String(this.nextCryptoId++),
      name,
      symbol,
      price,
      image,
      change24h,
      createdAt: new Date(),
    };
    this.cryptos.push(crypto);
    return crypto;
  }

  async findAllCryptos() {
    return [...this.cryptos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async findCryptoBySymbol(symbol) {
    return this.cryptos.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
  }

  async findCryptoById(id) {
    return this.cryptos.find(c => c._id === String(id));
  }

  async getTopGainers(limit = 10) {
    return [...this.cryptos].sort((a, b) => b.change24h - a.change24h).slice(0, limit);
  }

  async getNewListings(limit = 10) {
    return [...this.cryptos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
  }

  async updateCrypto(id, updates) {
    const crypto = this.cryptos.find(c => c._id === String(id));
    if (crypto) {
      Object.assign(crypto, updates);
    }
    return crypto;
  }

  async deleteCrypto(id) {
    const index = this.cryptos.findIndex(c => c._id === String(id));
    if (index > -1) {
      const deleted = this.cryptos.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
}

module.exports = new MockDatabase();

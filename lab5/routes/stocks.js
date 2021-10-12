const express = require('express');
const router = express.Router();
const data = require('../data');
const stocks = data.stocks;

router.get('/:id', async (req, res) => {
    try {
        const stock = await stocks.getStockById(req.params.id);
        res.json(stock);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});
  
router.get('/', async (req, res) => {
    try {
        const stockList = await stocks.getStocks();
        res.json(stockList);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
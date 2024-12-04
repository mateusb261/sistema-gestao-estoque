// /routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar produtos
router.get('/produtos', produtoController.getProdutos);

// Rota para cadastrar um novo produto
router.post('/produtos', produtoController.createProduto);

module.exports = router;

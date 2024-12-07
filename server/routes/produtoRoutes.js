// /routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar produtos
router.get('/produtos', produtoController.consultarProduto);

// Rota para cadastrar um novo produto
router.post('/produtos', produtoController.cadastrarProduto);

module.exports = router;

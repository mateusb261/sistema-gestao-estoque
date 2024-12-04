// /controllers/produtoController.js
const produtoModel = require('../models/produtoModel');

const getProdutos = async (req, res) => {
  try {
    const produtos = await produtoModel.getProdutos();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

const createProduto = async (req, res) => {
  try {
    const produto = req.body; // Dados do produto enviados no corpo da requisição
    const result = await produtoModel.createProduto(produto);
    res.status(201).json({ message: 'Produto criado com sucesso', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

module.exports = {
  getProdutos,
  createProduto
};

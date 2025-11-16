// /controllers/produtoController.js
const produtoModel = require('../models/produtoModel');

const consultarProduto = async (req, res) => {
  try {
    const produtos = await produtoModel.consultarProduto();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

const cadastrarProduto = async (req, res) => {
  try {
    const produto = req.body;

    // Validação dos campos obrigatórios
    if (!produto.gtin || !produto.nomeProduto || !produto.tipoProduto || !produto.estoqueMinimo) {
      return res.status(400).json({ error: "CAMPO_FALTANDO", message: "Preencha todos os campos de cadastro de produto!" });
    }

    // Chama a função do modelo para criar o produto
    const result = await produtoModel.cadastrarProduto(produto);

    // Resposta de sucesso
    res.status(201).json({ message: "Produto cadastrado com sucesso!", id: result.insertId });

  } catch (err) {
    console.error("Erro no cadastro de produto:", err);

    // Tratar erros específicos de banco de dados ou outros
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "DUPLICADO", message: "Já existe um produto com esse código GTIN!" });
    }

    // Erro genérico
    res.status(500).json({ error: "ERRO_INTERNO", message: "Ocorreu um erro ao criar o produto. Tente novamente." });
  }
};


module.exports = {
  consultarProduto,
  cadastrarProduto
};

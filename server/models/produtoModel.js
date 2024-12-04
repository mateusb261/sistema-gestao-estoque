// /models/produtoModel.js
const db = require('../config/db');

const getProdutos = async () => {
  const [rows] = await db.execute('SELECT * FROM PRODUTO');
  return rows;
};

const createProduto = async (produto) => {

  let codigogtin = produto.gtin;
  let nomeproduto = produto.nomeProduto;
  let estoqueminimo = produto.estoqueMinimo;
  let tipo_produto_idtipoproduto;
  let ativo = 1; // Definindo o produto como ativo por padrão
  let dtulttransacao = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD

  if (produto.tipoProduto === 'moveis') {
    tipo_produto_idtipoproduto = 1;
  }

  else if (produto.tipoProduto === 'eletronicos') {
    tipo_produto_idtipoproduto = 2;
  }

  else if (produto.tipoProduto === 'alimentacao') {
    tipo_produto_idtipoproduto = 3;
  }

  const [result] = await db.execute(
    'INSERT INTO PRODUTO (codigogtin, nomeproduto, estoqueminimo, ativo, dtulttransacao, tipo_produto_idtipoproduto) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [codigogtin, nomeproduto, estoqueminimo, ativo, dtulttransacao, tipo_produto_idtipoproduto]
  );
  return result;
};


module.exports = {
  getProdutos,
  createProduto
};

// /models/produtoModel.js
const db = require('../config/db');

const getProdutos = async () => {
  const [rows] = await db.execute('SELECT * FROM PRODUTO');
  return rows;
};

const createProduto = async (produto) => {
  try {
    let codigogtin = produto.gtin;
    let nomeproduto = produto.nomeProduto;
    let estoqueminimo = produto.estoqueMinimo;
    let ativo = 1; // Produto ativo por padrão
    let dtulttransacao = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
    let tipo_produto_idtipoproduto;

    // Determinar o tipo de produto
    if (produto.tipoProduto === 'moveis') {
      tipo_produto_idtipoproduto = 1;
    } else if (produto.tipoProduto === 'eletronicos') {
      tipo_produto_idtipoproduto = 2;
    } else if (produto.tipoProduto === 'alimentacao') {
      tipo_produto_idtipoproduto = 3;
    } else {
      throw new Error(`Tipo de produto inválido: ${produto.tipoProduto}`);
    }

    // Inserção no banco de dados
    const [result] = await db.execute(
        'INSERT INTO PRODUTO (codigogtin, nomeproduto, estoqueminimo, ativo, dtulttransacao, tipo_produto_idtipoproduto) VALUES (?, ?, ?, ?, ?, ?)',
        [codigogtin, nomeproduto, estoqueminimo, ativo, dtulttransacao, tipo_produto_idtipoproduto]
    );

    console.log('Produto cadastrado com sucesso:', result);
    return result;

  } catch (error) {
    console.error('Erro ao cadastrar produto:', error.message);
    console.error('Detalhes do erro:', error);
    throw error; // Opcional: relançar o erro para tratamento posterior
  }
};


module.exports = {
  getProdutos,
  createProduto
};

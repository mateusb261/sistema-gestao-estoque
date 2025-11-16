import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/produto.css'; // Importando o arquivo CSS

const Produto = () => {
  const [produtos, setProdutos] = useState(
    JSON.parse(localStorage.getItem('produtos')) || []
  );
  const [form, setForm] = useState({
    gtin: '',
    nomeProduto: '',
    tipoProduto: 'moveis',
    estoqueMinimo: '',
    index: '',
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const cadastrarProduto = async () => {
  const { gtin, nomeProduto, tipoProduto, estoqueMinimo } = form;

  try {
    // Faz a requisição para o servidor
    const response = await fetch("http://localhost:8000/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gtin,
        nomeProduto,
        tipoProduto,
        estoqueMinimo,
      }),
    });

    // Processa a resposta do servidor
    if (response.ok) {
      alert("Produto cadastrado com sucesso!");
      limparFormulario();
    } else {
      const errorData = await response.json();

      // Tratamento específico para erros do servidor
      switch (errorData.error) {
        case "CAMPO_FALTANDO":
          alert(`${errorData.message}`);
          break;
        case "DUPLICADO":
          alert(`${errorData.message}`);
          break;
        case "ERRO_INTERNO":
          alert(`${errorData.message}`);
          break;
        default:
          alert(`${errorData.message}`);
      }
    }
  } catch (error) {
    alert(`Erro ao conectar ao servidor: ${error.message}`);
  }
};


  const consultarProduto = () => {
    const { gtin, nomeProduto, tipoProduto, estoqueMinimo } = form;

    const resultados = produtos.filter((produto) => {
      return (
        (gtin === '' || produto.gtin.includes(gtin)) &&
        (nomeProduto === '' || produto.nomeProduto.includes(nomeProduto)) &&
        (tipoProduto === '' || produto.tipoProduto === tipoProduto) &&
        (estoqueMinimo === '' || Number(produto.estoqueMinimo) >= Number(estoqueMinimo))
      );
    });

    carregarProdutos(resultados);
  };

  const carregarProdutos = (lista = produtos) => {
    setProdutos(lista);
  };

  const editarProduto = (index) => {
    const produto = produtos[index];
    setForm({ ...produto, index });
  };

  const excluirProduto = (index) => {
    const novaLista = produtos.filter((_, i) => i !== index);
    setProdutos(novaLista);
    localStorage.setItem('produtos', JSON.stringify(novaLista));
  };

  const limparFormulario = () => {
    setForm({
      gtin: '',
      nomeProduto: '',
      tipoProduto: 'moveis',
      estoqueMinimo: '',
      index: '',
    });
  };

  return (
    <div>
      <header>
        <div className="logo">
          <h1>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              SistemaGE
            </Link>
          </h1>
        </div>
      </header>

      <nav>
        <ul>
          <li><Link to="/usuario">Usuários</Link></li>
          <li><Link to="/produto">Produtos</Link></li>
          <li><Link to="/fornecedor">Fornecedores</Link></li>
          <li><Link to="/alerta">Alertas (6)</Link></li>
          <li><Link to="/">Sair</Link></li>
        </ul>
        <ul className="voltar">
          <li><Link to="/inicio">Voltar</Link></li>
        </ul>
      </nav>

      <main>
        <div className="cadastro-produto">
          <h2>Manter Produto</h2>

          <form>
            <label>Código GTIN:</label><br />
            <input
              type="text"
              name="gtin"
              value={form.gtin}
              onChange={handleInputChange}
            /><br /><br />

            <label>Nome do Produto:</label><br />
            <input
              type="text"
              name="nomeProduto"
              value={form.nomeProduto}
              onChange={handleInputChange}
            /><br /><br />

            <label>Tipo do Produto:</label><br />
            <select
              name="tipoProduto"
              value={form.tipoProduto}
              onChange={handleInputChange}
            >
              <option value="moveis">Móveis</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="alimentacao">Alimentação</option>
            </select><br /><br />

            <label>Estoque Mínimo:</label><br />
            <input
              type="number"
              name="estoqueMinimo"
              min="0"
              value={form.estoqueMinimo}
              onChange={handleInputChange}
            /><br /><br />

            <button type="button" onClick={cadastrarProduto}>
              Cadastrar Produto
            </button>
            <button type="button" onClick={consultarProduto}>
              Consultar Produto
            </button>
            <button type="button" onClick={limparFormulario}>
              Limpar
            </button>
          </form>
        </div>

        <div className="lista-produtos">
          <h3>Lista de Produtos</h3>
          <table id="tabela-produtos">
            <thead>
              <tr>
                <th>Código GTIN</th>
                <th>Nome do Produto</th>
                <th>Tipo</th>
                <th>Estoque Mínimo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.gtin}</td>
                  <td>{produto.nomeProduto}</td>
                  <td>{produto.tipoProduto}</td>
                  <td>{produto.estoqueMinimo}</td>
                  <td>
                    <button onClick={() => editarProduto(index)}>Alterar</button>
                    <button onClick={() => excluirProduto(index)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Produto;

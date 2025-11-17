import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/inicio.css'; // Importando o arquivo CSS

const Inicio = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <h1><Link to="/" style={{color: 'white', textDecoration: 'none'}}>SistemaGE</Link></h1>
        </div>
      </header>
      
      <nav>
        <ul>
          <li><Link to="/usuario">Usuários</Link></li>
          <li><Link to="/produto">Produtos</Link></li>
          <li><Link to="/fornecedor">Fornecedores</Link></li>
          <li><Link to="/alerta">Alertas (6)</Link></li>
          <li><Link to="/saida">Saída </Link></li>
          <li><Link to="/login">Sair</Link></li>
        </ul>
      </nav>

      <main>
        <div className="barra-tarefas">
          <h3>Relatórios</h3>
          <div className="botao-container">
            <button><Link to="/relatorio">Entrada de Produtos</Link></button>
            <button><Link to="/relatorio">Saída de Produtos</Link></button>
            <button><Link to="/relatorio">Principais Clientes</Link></button>
            <button><Link to="/relatorio">Tempo de Permanência</Link></button>
            <button><Link to="/relatorio">Lucro ou Prejuízo</Link></button>
          </div>
        </div>

        <div className="registros">
          <h3>Registros</h3>
          <div className="botao-container">
            <button><Link to="/entrada">Registrar Entrada</Link></button>
            <button><Link to="/saida">Registrar Saída</Link></button>
          </div>
        </div>

        <h2>Bem-vindo, Usuário X!</h2>
      </main>
    </div>
  );
}

export default Inicio;

import React from 'react';
import '../assets/usuario.css';  // Importando o arquivo CSS

const Alerta = () => {
  return (
    <div>
      <header>
        <div class="logo">
            <h1><a href="inicio.html" style="color: white; text-decoration: none;">SistemaGE</a></h1>
        </div>
    </header>    
    <nav>
        <ul>
            <li><a href="usuario.html">Usuários</a></li>
            <li><a href="produto.html">Produtos</a></li>
            <li><a href="fornecedor.html">Fornecedores</a></li>
            <li><a href="alerta.html">Alertas (6)</a></li>
            <li><a href="login.html">Sair</a></li>
        </ul>
    </nav>
    <main>
        <div class="barra-tarefas">
            <h3>Relatórios</h3>
            <div class="botao-container">
                <button onclick="window.location.href='relatorio.html'">Entrada de Produtos</button>
                <button onclick="window.location.href='relatorio.html'">Saída de Produtos</button>
                <button onclick="window.location.href='relatorio.html'">Principais Clientes</button>
                <button onclick="window.location.href='relatorio.html'">Tempo de Permanência</button>
                <button onclick="window.location.href='relatorio.html'">Lucro ou Prejuízo</button>
            </div>
        </div>

        <div class="registros">
            <h3>Registros</h3>
            <div class="botao-container">
                <button onclick="window.location.href='entrada.html'">Registrar Entrada</button>
                <button onclick="window.location.href='saida.html'">Registrar Saída</button>
            </div>
        </div>

        <h2>Bem-vindo, Usuário X!</h2>
    </main>
    </div>
  );
}

export default Alerta;

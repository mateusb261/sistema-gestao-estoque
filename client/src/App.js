import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio'; // A página inicial
import Usuario from './components/Usuario'; // Nova página para 'Usuários'
import Produto from './components/Produto'; // Nova página para 'Produtos'
import Fornecedor from './components/Fornecedor'; // Nova página para 'Fornecedores'
import Alerta from './components/Alerta'; // Nova página para 'Alertas'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={<Inicio />} />
        {/* Outras rotas */}
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/produto" element={<Produto />} />
        <Route path="/fornecedor" element={<Fornecedor />} />
        <Route path="/alerta" element={<Alerta />} />
      </Routes>
    </Router>
  );
}

export default App;

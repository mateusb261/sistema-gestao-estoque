// /server.js
const express = require('express');
const app = express();
const produtoRoutes = require('./routes/produtoRoutes');
const cors = require('cors');

// Habilita o CORS para todas as origens (pode ser configurado de forma mais restrita)
app.use(cors());

// Ou para uma origem específica, se você quiser restringir o acesso:
// app.use(cors({
//   origin: 'http://localhost:3001' // Cliente está rodando na porta 3001
// }));

// Configurações do servidor
app.use(express.json()); // Para permitir o envio de dados em JSON

// Usando as rotas de produto
app.use('/api', produtoRoutes);

// Inicializando o servidor
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

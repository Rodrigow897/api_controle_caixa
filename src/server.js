
const express = require('express');

const transacaoRoutes = require('./routes/transacaoRoutes');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('API de Gerenciamento Financeiro está online!');
});

app.use('/transacoes', transacaoRoutes);
app.get('/resumo', transacaoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
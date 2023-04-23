require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const PORT = process.env.PORT;

// Database
const db = new sqlite3.Database('./../db/devsfood.db');



// Cria um aplicativo express
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



// Rota teste
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM category';
  db.all(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// Rota de Imagem
app.get('/images/:file', (req, res) => {
  const { file } = req.params;
  const filepath = __dirname + '/images/' + file;
  fs.access(filepath, fs.constants.F_OK, err => {
    if (err) res.status(404).send('Arquivo não encontrado');
    else res.sendFile(filepath);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor Node.js executando na porta ${PORT}!`);
});

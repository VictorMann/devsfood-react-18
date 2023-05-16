require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT;

// Database
const db = new sqlite3.Database('./../db/devsfood.db');



// Cria um aplicativo express
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Register
app.post('/register', (req, res) => {
  const { user, end } = req.body;
  db.get('SELECT MAX(id) as id FROM user', (err, result) => {
    if (err) throw err;
    let user_id = 1;
    if (result.id) user_id = result.id + 1;
    const password = bcrypt.hashSync(user.password, 10);
    db.run('INSERT INTO user VALUES (?, ?, ?, ?)', [user_id, user.name, user.email, password], (err) => {
      if (err) throw err;
      console.log(`Usuário: ${user.email} - criado com sucesso!`);

      db.get('SELECT MAX(ID) as id FROM endereco', (err, result) => {
        if (err) throw err;
        let end_id = 1;
        if (result.id) end_id = result.id + 1;
        db.run('INSERT INTO endereco VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [end_id, user_id, end.endereco, end.numero, end.complemento, end.cep, end.cidade, end.bairro, end.uf], (err) => {
          if (err) throw err;
          console.log(`Endereço: ${end.endereco} - criado com sucesso!`);
  
          // Gerar um token JWT
          const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '6h' });
          // Retornar o token JWT
          return res.json({ token });
        });
      });

    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM user WHERE email = ? LIMIT 1', email, (err, result) => {
    if (err) throw err;
    // verifica se encontrou o usuário do email
    if (!result) return res.status(404).json({ error: 'e-mail não encontrado' });
    // Verificar as informações do usuário
    if (!bcrypt.compareSync(password, result.password)) {
      return res.status(404).json({ error: 'Usuário ou senha incorretos' });
    }
    // Gerar um token JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '6h' });
    // Retornar o token JWT
    return res.json({ token });
  });
});

app.get('/user', verifyToken, (req, res) => {
  db.get('SELECT * FROM user WHERE email = ?', req.email, (err, result) => {
    if (err) throw err;
    const user = result;
    db.get('SELECT * FROM endereco WHERE user_id = ?', user.id, (err, result) => {
      if (err) throw err;
      return res.json({ user, end: result});
    });
  });
});

// Rota teste
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM category';
  db.all(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// Rota produtos
app.get('/products', (req, res) => {
  let { cat, q } = req.query;
  let filters = [];

  cat = isNaN(cat) ? '' : cat;
  let sql = 'SELECT * FROM product WHERE 1 = 1';
  
  if (cat) {
    sql += ' AND category_id = ?';
    filters.push(cat);
  }

  if (q) {
    sql += ' AND name LIKE ?';
    filters.push(`%${q}%`);
  }


  db.all(sql, filters, (err, result) => {
    if (err) throw err;
    res.json(result);
  }); 
});

// Editar Endereço
app.put('/endereco', verifyToken, (req, res) => {
  let end = req.body;
  let sql = `UPDATE endereco 
  SET endereco = ?, numero = ?, complemento = ?,
  cep = ?, cidade = ?, bairro = ?, uf = ? 
  WHERE id = ?`;
  let vals = [end.endereco, end.numero, end.complemento, end.cep, end.cidade, end.bairro, end.uf, end.id];
  db.run(sql, vals, (err) => {
    if (err) throw err;
    return res.json(req.body);
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

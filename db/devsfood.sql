BEGIN TRANSACTION;

CREATE TABLE user (
  id SMALLINT UNSIGNED PRIMARY KEY NOT NULL,
  name VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE endereco (
  id SMALLINT UNSIGNED PRIMARY KEY NOT NULL,
  user_id SMALLINT REFERENCES user (id),
  endereco VARCHAR(256) NOT NULL,
  numero VARCHAR(256) NOT NULL,
  complemento VARCHAR(100),
  cep VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  uf VARCHAR(100) NOT NULL
);

CREATE TABLE category (
  id SMALLINT UNSIGNED PRIMARY KEY NOT NULL,
  name VARCHAR(256) NOT NULL,
  image VARCHAR(512) NOT NULL
);

INSERT INTO category (id, name, image) VALUES
(1, 'Tortas', 'http://localhost:3001/images/torta.jpg'),
(2, 'Donuts', 'http://localhost:3001/images/donut.jpg'),
(3, 'Cookies', 'http://localhost:3001/images/cookie.jpg');

CREATE TABLE product (
  id SMALLINT UNSIGNED PRIMARY KEY NOT NULL,
  category_id SMALLINT REFERENCES category (id),
  name VARCHAR(256) NOT NULL,
  price FLOAT DEFAULT 0,
  ingredients VARCHAR(512),
  points INTEGER UNSIGNED DEFAULT 0,
  image VARCHAR(1024) NOT NULL
);

INSERT INTO product (id, category_id, name, price, ingredients, image) VALUES
(1, 1, 'Torta de chocolate', 3.5, '500g de farinha, 1 col. de sopa de chocolate, 3x ovo', 'http://localhost:3001/images/torta1.jpg'),
(2, 1, 'Torta de limão', 7.35, '350g de farinha, 350ml de suco de limão', 'http://localhost:3001/images/torta2.jpg'),
(3, 2, 'Donut de moranga', 1.99, 'farinho, ovo, etc.', 'http://localhost:3001/images/donut1.jpg'),
(4, 3, 'Cookie de gotas de chocolate', 2.4, 'leite em pó, farinha e chocolate', 'http://localhost:3001/images/cookie1.jpg');

COMMIT;
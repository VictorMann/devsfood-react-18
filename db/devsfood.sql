BEGIN TRANSACTION;

CREATE TABLE category (
  id SMALLINT UNSIGNED PRIMARY KEY NOT NULL,
  name VARCHAR(256) NOT NULL,
  image VARCHAR(512) NOT NULL
);

INSERT INTO category (id, name, image) VALUES
(1, 'Tortas', 'http://localhost:3001/images/torta.jpg'),
(2, 'Donuts', 'http://localhost:3001/images/donut.jpg'),
(3, 'Cookies', 'http://localhost:3001/images/cookie.jpg');

COMMIT;
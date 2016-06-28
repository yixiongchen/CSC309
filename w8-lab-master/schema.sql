CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE addresses (
  id INTEGER PRIMARY KEY,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  planet TEXT NOT NULL
);

CREATE TABLE packages (
  id INTEGER PRIMARY KEY,
  shipping_customer INTEGER NOT NULL,
  receiving_customer INTEGER NOT NULL,
  destination_address INTEGER NOT NULL,
  sent_on TEXT NOT NULL,
  due_on TEXT NOT NULL,
  received_on TEXT,

  FOREIGN KEY(shipping_customer) REFERENCES customers(id),
  FOREIGN KEY(receiving_customer) REFERENCES customers(id),
  FOREIGN KEY(destination_address) REFERENCES addresses(id)
);

CREATE TABLE customer_addresses (
  customer INTEGER,
  address INTEGER,

  FOREIGN KEY(customer) REFERENCES customers(id),
  FOREIGN KEY(address) REFERENCES addresses(id)
);


INSERT INTO customers (id, name, phone, email)
  VALUES (1, 'William Windsor', '+44 1582 872171', 'wwindsor@example.org');
INSERT INTO customers (id, name, phone, email)
  VALUES (2, 'Nils Olav', '+44 131 314 0326', 'mrpenguin@example.org');

INSERT INTO addresses (id, street, city, country, planet)
  VALUES (1, 'Whipsnade Zoo', 'Whipsnade', 'England', 'Earth');
INSERT INTO addresses (id, street, city, country, planet)
  VALUES (2, '134 Corstorphine Road', 'Edinburgh', 'Scotland', 'Earth');

INSERT INTO customer_addresses (customer, address) values (1, 1);
INSERT INTO customer_addresses (customer, address) values (2, 2);

INSERT INTO packages (shipping_customer, receiving_customer, destination_address, sent_on, due_on)
  VALUES (2, 1, 1, '2016-06-27 14:31:03', '2016-06-28 08:00:00');

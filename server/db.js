const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/reservations_db');
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS restaurants;
    DROP TABLE IF EXISTS customers;
    CREATE TABLE customers(
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );
    CREATE TABLE restaurants(
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );
    CREATE TABLE reservations(
      id UUID PRIMARY KEY,
      customer_id UUID REFERENCES customers(id) NOT NULL,
      restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
      reservation_date DATE DEFAULT now()
    );
  `;
  await client.query(SQL);
}

module.exports = {
  client,
  createTables
};
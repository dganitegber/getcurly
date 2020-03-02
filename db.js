// DROP TABLE IF EXISTS products;
// CREATE TABLE products(
//      id SERIAL PRIMARY KEY,
//     name VARCHAR NOT NULL,
//     brand VARCHAR NOT NULL,
//     type VARCHAR NOT NULL,
//     cg_approved VARCHAR,
//     code VARCHAR UNIQUE,
//  );
// //
// // );
// //

//
// CREATE TABLE friends(
//   id SERIAL PRIMARY KEY,
//   asked_by INT REFERENCES users(id) NOT NULL,
//   asked_to INT REFERENCES users(id) NOT NULL,
//   accepted BOOLEAN DEFAULT false
// );

// )

const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/final"
);

exports.addProduct = function(name, brand, type, cg_approved) {
    return db.query(
        `INSERT INTO products (name, brand, type, cg_approved) VALUES ($1, $2, $3, $4) RETURNING name`,
        [name, brand, type, cg_approved]
    );
};

exports.getLastProducts = function() {
    return db.query("SELECT * FROM products ORDER BY id desc");
};

exports.getProductsByTyping = function(val) {
    return db
        .query(
            `SELECT id, name, brand, type, cg_approved FROM products WHERE name ILIKE $1;`,
            [val + "%"]
        )
        .then(({ rows }) => {
            return rows;
        });
};

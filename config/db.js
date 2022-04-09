var mongoose = require('mongoose');
require('dotenv').config();

const db = {
    connect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const auth = db.user && db.password ? `${db.user}:${db.password}@` : '';

async function connect() {
    try {
        await mongoose.connect(
            `${db.connect}://${auth}${db.host}/${db.database}`
        );

        console.log('Connected to mongodb');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };

const mongoose = require('mongoose');
require('dotenv').config(); // Isso garante que as variáveis de ambiente sejam carregadas

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDatabase = process.env.MONGO_DATABASE;

const connectionString = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`;

mongoose.connect(connectionString);

const db = mongoose.connection;

console.log(connectionString); // Isso mostrará a string de conexão completa no console

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = db;
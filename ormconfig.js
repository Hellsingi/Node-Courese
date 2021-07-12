const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
  host: process.env['POSTGRES_HOST'],
  type: 'postgres',
  port: Number(process.env['POSTGRES_PORT']),
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  synchronize: true,
  extra: {
    ssl: false
  },
  entities: [path.join(__dirname, '..', 'src/entity/*.{ts,js}')],
  cli: {
    "entitiesDir": "src/entity"
  }
};

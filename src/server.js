import app from './app.js';
import db from './config/connection/db.js';
import { SERVER_PORT } from './config/const.js';

async function run() {
  await db.connection.sync();
  app.listen(SERVER_PORT);
}

run();
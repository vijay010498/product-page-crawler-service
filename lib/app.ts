import { postgresClient } from './postgres/client';
import { createTable } from './scripts/create-table';

(async () => {
  try {
    await postgresClient.connect();
    await createTable();
    console.log('Service Started Successfully');
  } catch (err) {
    console.log('Error in Starting service', err);
  }
})();
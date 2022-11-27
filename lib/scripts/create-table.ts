import { postgresClient } from '../postgres/client';
import postgresConstants from '../constants/postgres';

const createTable = async (): Promise<Boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      await postgresClient.query(
        `CREATE TABLE IF NOT EXISTS ${postgresConstants.crawledResultsTable}
                 (
                    job_id varchar(50) FOREIGN KEY (job_id) REFERENCES ${postgresConstants.crawlQueueTable}(job_id),
                    title varchar(150) NOT NULL,
                    brand varchar(100) NOT NULL,
                    image_url varchar(255) NOT NULL,
                    result_id varchar(50) PRIMARY KEY,
                    created_at timestamp NOT NULL DEFAULT NOW()
                 )`
      );
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

export {
  createTable
};
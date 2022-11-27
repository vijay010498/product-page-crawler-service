import type { CrawlResult } from '../../../types';
import postgresConstants from '../../../constants/postgres';
import { postgresClient } from '../../../postgres/client';
import { JobStatus } from '../../../types/enums/Queue';
import axios from 'axios';
import { Queue } from '../../queue';

class Crawl {
  static insertCrawlResultAndUpdateCrawlQueue(result: CrawlResult): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await postgresClient.query('BEGIN');
        const { job_id, title, brand, image_url, result_id } = result;
        // insert result set
        await postgresClient.query(
          `INSERT INTO ${postgresConstants.crawledResultsTable} (job_id, title, brand, image_url, result_id)
           VALUES ($1, $2, $3, $4, $5)`,
          [job_id, title, brand, image_url, result_id]
        );
        await axios.put(`http://crawling-queue-service:5000/${job_id}/${JobStatus.completed}`);
        await postgresClient.query('COMMIT');
        resolve(true);
      } catch (err) {
        console.log('Error in inserting Crawl Result', err);
        const { job_id } = result;
        await Queue.updateFailedJob(job_id);
        await postgresClient.query('ROLLBACK');
        reject(err);
      }
    });
  }
}

export {
  Crawl
};


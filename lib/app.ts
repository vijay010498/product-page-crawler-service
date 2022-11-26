import { postgresClient } from './postgres/client';
import { createTable } from './scripts/create-table';
import { CrawlCron } from './services/crawl/crawl-cron';

(async () => {
  try {
    await postgresClient.connect();
    await createTable();
    CrawlCron.crawlCronJob().start();
    console.log('Service Started Successfully');
  } catch (err) {
    console.log('Error in Starting service', err);
  }
})();
import { postgresClient } from './postgres/client';
import { createTable } from './scripts/create-table';
import { CrawlService } from './services/crawl';
(async () => {
  try {
    await postgresClient.connect();
    await createTable();
    await CrawlService.crawlURL('https://www.flaconi.de/parfum/hugh-parsons/whitehall/hugh-parsons-whitehall-eau-de-parfum.html#sku=20110171', 'ab450283-be6a-4fd2-a1f0-4feb98c9d88a');
    console.log('Service Started Successfully');
  } catch (err) {
    console.log('Error in Starting service', err);
  }
})();
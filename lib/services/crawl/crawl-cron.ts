import { CronJob } from 'cron';
import { Queue } from '../queue';
import { CrawlService } from './index';

class CrawlCron {
  static crawlCronJob(): CronJob {
    return new CronJob('*/1 * * * * *', async () => {
      try {
        const { job_id, job_url, job_name } = await Queue.deQueue();
        if (job_id && job_url) {
          console.log(`Crawl Started for job: ${job_id}, URL:${job_url}, JobName: ${job_name}`);
          await CrawlService.crawlURL(job_url, job_id);
          console.log(`Crawl Completed for job: ${job_id}, URL: ${job_url}, JobName:${job_name}`,);
        } else {
          console.log('No Jobs on queue to crawl');
        }
        return;
      } catch (err) {
        console.log('cron-job-failed', err);
        return;
      }
    });
  }
}

export {
  CrawlCron
};
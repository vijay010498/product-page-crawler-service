import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import flaconConstants from '.././../constants/flacon.de';
import { Crawl } from '../queries/crawl';
import { v4 } from 'uuid';
import { Queue } from '../queue';

class CrawlService {
  static async crawlURL(crawl_url: URL, job_id: string) {
    try {
      const response = await fetch(crawl_url);
      const html = await response.text();
      const htmlSelectors = cheerio.load(html);
      const brandSelector: any = htmlSelectors(`.${flaconConstants.brandClassName}`).attr();
      const imageSelector: any = htmlSelectors(`.${flaconConstants.imageClassName}`).attr();
      const titleSelector: any = htmlSelectors(`.${flaconConstants.titleClassName}`);
      const { alt: brand } = brandSelector;
      const { src: image_url } = imageSelector;
      const title = `${brandSelector.alt} ${titleSelector.text()}`;
      await Crawl.insertCrawlResultAndUpdateCrawlQueue({
        brand,
        image_url,
        job_id,
        result_id: v4(),
        title,
      });
      return;
    } catch (err) {
      console.log(`Error in Crawl Service for job_id:${job_id}`);
      await Queue.updateFailedJob(job_id);
    }
  }
}

export {
  CrawlService
};
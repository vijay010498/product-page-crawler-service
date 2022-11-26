import axios from 'axios';
import type { Job } from '../../types';

class Queue {
  static deQueue(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const job: Job = await axios.get('http://localhost:5000/job');
        resolve({
          job_id: job.job_id,
          job_url: job.job_url
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export {
  Queue
};
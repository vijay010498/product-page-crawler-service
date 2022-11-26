import axios from 'axios';
import type { Job } from '../../types';

class Queue {
  static deQueue(): Promise<Job> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: {  job } } = await axios.get('http://localhost:5000/job');
        resolve({
          job_id: job.job_id,
          job_url: job.job_url,
          job_name: job.job_name
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
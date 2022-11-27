import axios from 'axios';
import type { Job } from '../../types';
import { JobStatus } from '../../types/enums/Queue';

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

  static updateFailedJob(job_id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.put(`http://localhost:5000/${job_id}/${JobStatus.failed}`);
        resolve(true);
      } catch (err) {
        console.log(`Update Job to Failed Failed, job_id:${job_id}`, err);
        reject(err);
      }
    });
  }
}

export {
  Queue
};
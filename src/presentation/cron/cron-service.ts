import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {


    public static createJob( cronTime: CronTime, onTick: OnTick ): CronJob<null, null> {
        const job = new CronJob(cronTime, onTick);
        job.start();
        return job;
    }

}
import { SeverityLevel } from "@prisma/client";
import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const fslogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

export class ServerApp {


    public static async start() {

        console.log('Server started...');

        // console.log( envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);

        // const emailService = new EmailService(
        //     logRepository
        // );
        // emailService.sendEmail({
        //     to: 'pruebatempep@gmail.com',
        //     subject: 'Logs del sistema',
        //     htmlBody: `
        //         <h3>Logs de sistema - NOC</h3>
        //         <p>EL LOBO SIEMPRE CUIDA A SU LOBA</p>
        //         <p>AUUUHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</p>
        //         <strong>* inserte canción de Animals *</strong>
        //     `
        // });

        // emailService.sendEmailWithFileSystemLogs(['ferjesusurd@gmail.com', 'pruebatempep@gmail.com']);

        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url: string = 'https://google.com';
                new CheckServiceMultiple(
                    () => console.log(`${ url } is ok`),
                    ( error ) => console.log( error ),
                    [fslogRepository, mongoLogRepository, postgresLogRepository]
                ).execute( url );
            }
        );

        // await logRepository.saveLog({
        //     level: LogSeverityLevel.medium,
        //     message: 'Test de prueba postgres',
        //     origin: 'Server.ts',
        //     createdAt: new Date()
        // })

        // const logs = await logRepository.getLogs(LogSeverityLevel.medium);
        // console.log(logs);
        

    }



}
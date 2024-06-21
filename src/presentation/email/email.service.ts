import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[]
}

interface Attachments {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
            // console.log(sentInformation);

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            });

            return true;
        } catch (error) {
            console.log(error);
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email was not sent',
                origin: 'email.service.ts'
            });
            return false;
        }

    }

    sendEmailWithFileSystemLogs(to: string | string[]) {

        const subject = 'Logs de sistema';
        const htmlBody = `
                <h3>Logs de sistema - NOC</h3>
                <p>EL LOBO SIEMPRE CUIDA A SU LOBA</p>
                <p>AUUUHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</p>
                <strong>* inserte canción de Animals *</strong>
        `;

        const attachments: Attachments[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            }
        ];

        return this.sendEmail({ to, subject, htmlBody, attachments });

    }


}
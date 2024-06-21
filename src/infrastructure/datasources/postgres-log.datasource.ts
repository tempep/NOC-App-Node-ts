import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

export class PostgresLogDatasource implements LogDatasource {

    private convertSeverityLevel = (severityLevel: LogSeverityLevel): SeverityLevel => {
        if (severityLevel === 'low') return 'LOW';
        if (severityLevel === 'medium') return 'MEDIUM';
        if (severityLevel === 'high') return 'HIGH';
        return 'LOW';
    }

    async saveLog(log: LogEntity): Promise<void> {

        const newLog = await prismaClient.logModel.create({
            data: {
                level: this.convertSeverityLevel(log.level),
                message: log.message,
                origin: log.origin,
                createdAt: log.createdAt
            }
        });
        console.log('Postgres log is created:', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: this.convertSeverityLevel(severityLevel)
            }
        });
        return logs.map((log) => LogEntity.fromObject(log));
    }

}

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel,
    origin: string,
    message: string,
    createdAt?: Date,
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions  ) {

        const { message, level, origin, createdAt = new Date() } = options;

        this.level = level;
        this.origin = origin;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson( json: string ): LogEntity {
        if ( json === '' ) json = '{}';
        const { message, level, origin, createdAt } = JSON.parse(json);

        // if (!message) throw new Error('Message is required');
        // if (!level) throw new Error('Level is required');
        // if (!origin) throw new Error('Origin is required');

        const log = new LogEntity({ message, level, origin, createdAt });
        log.createdAt = new Date( createdAt );
        return log;
    }

    static fromObject = ( object: { [key: string]: any } ): LogEntity => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }

}
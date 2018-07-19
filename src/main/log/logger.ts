import * as winston from "winston";
import * as moment from "moment";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((data) => {
          const info: any = data;
          const symbol = Symbol.for("splat");
          const timestamp = moment().utc().add(2, 'hours').toISOString();
          return `${timestamp} ${info.level}: ${info.message} ${info[symbol] !== undefined ? JSON.stringify(info[symbol]) : ''}`;
        }),
      ),
      handleExceptions: true,
    }),
  ]
});

export default logger;
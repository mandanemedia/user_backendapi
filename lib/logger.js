const winston = require('winston');
const rotateFile = require('winston-daily-rotate-file');
// like const combine = winston.format.combine; but for 3 consts
const { combine, timestamp, printf } = winston.format;

//Levels: info, error
const options = {
    log_info: {
        filename: 'logs/log_info',
        datePattern: 'YYYY_MM_DD',
        prepend: true,
        level: 'info',
        handleExceptions: true,
        json: true,
        colorize:true
    },
    log_error: {
        filename: 'logs/log_error',
        datePattern: 'YYYY_MM_DD',
        prepend: true,
        level: 'error',
        handleExceptions: true,
        json: true,
        colorize:true
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true
    }
};

const myFormat = printf(info => {
    return `${info.timestamp} [${info.level}]: ` + JSON.stringify(info.message) ;
});

var logger =  winston.createLogger({
    format: combine(
      timestamp(),
      myFormat
    ),
    transports: [
        new winston.transports.DailyRotateFile(options.log_info),
        new winston.transports.File(options.log_error)
        // new (winston.transports.Console)(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

//just another library for display the functionName, filename and line
const ansi = require ('ansicolor');
let log = require ('ololog').configure ({
/*  Injects a function after the "render" step            */
    'render+' (text, { consoleMethod = '' }) {
        if (text && process.env.NODE_ENV !== 'test') {
            let strippedText = ansi.strip(text).trim(); // remove ANSI codes
            strippedText = strippedText.replace(/(\r\n\t|\n|\r\t)/gm,"");
            /*  Writes to the file only if .info or .error or .warn has been specified.  */
            // if (consoleMethod) {

                logger.info(strippedText);
                if ((consoleMethod === 'error')) {
                    logger.error(strippedText);
                }
            // }
        }
        return text
    }
})
module.exports = log;

const chalk = require('chalk');
const winston = require('winston');
const winlog = require('winston-loggly-bulk');

const attach = opts => {
    winston.add(winston.transports.Loggly, {
        token: opts.token,
        subdomain: opts.subdomain,
        tags: ["Winston-NodeJS"],
        json: true
    });
};

const error = err => {
    winston.log('error', err);
    throw new Error(err);
};

const log = msg => {
    winston.log('info', msg);
};

const errorHandler = () => {
    return (err, req, res, next) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(chalk.bold.bgRed('\n-= A U R A  E R R O R  R E P O R T E R =-\n'));

            if (req.route) {
                console.log(chalk.bold.green(`ROUTE: ${req.route.path}  &&  METHOD: ${req.route.stack[0].method.toUpperCase()}\n`));
            }

            console.error(chalk.bold(err.stack) + '\n');
        }

        res.status(500).send(err.stack);
    }
};

module.exports = {
    attach,
    error,
    log,
    errorHandler
};

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

const _handle404 = (req, res, next) => {
    res.status(404).json({
        errors: ['ResourceNotFound'],
        message: 'The resource you are requesting does not exist or was moved.'
    });
};

const _handle5xx = (err, res, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(chalk.bold.bgRed('\n-= A U R A  E R R O R  R E P O R T E R =-\n'));

        if (req.route) {
            console.log(chalk.bold.green(`ROUTE: ${req.route.path}  &&  METHOD: ${req.route.stack[0].method.toUpperCase()}\n`));
        }

        console.error(chalk.bold(err.stack) + '\n');
    }

    res.status(500).send(err.stack);
};

const handler = app => {
    [_handle404, _handle5xx].forEach(middleware => {
        app.use(middleware);
    });
};

module.exports = {
    attach,
    error,
    log,
    handler
};

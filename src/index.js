const mb = require('mountebank');
const settings = require('./settings');
const loginService = require('./login-service');
const accountService = require('./account-service');
const transactionsService = require('./transactions-service');
const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*']
});
mbServerInstance.then(function () {
    loginService.loginUser();
    accountService.getUserAccounts();
    transactionsService.getUserTransactions();
});
const mb = require('mountebank');
const settings = require('./config/settings');
const loginService = require('./service/login-service');
const accountService = require('./service/account-service');
const transactionsService = require('./service/transactions-service');


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
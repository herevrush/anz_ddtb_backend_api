const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function getUserTransactions() {
    const stubs = [
        {
            predicates: [{
                equals: {
                    method: "GET",
                    "path": "/transactions/234565657",
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({
                            transactions: [{
                                id: 2345656571,
                                date: "15/10/2020",
                                description: "payment to ABC",
                                debit: 10.00,
                                credit: 0,
                                balance: 1234.455
                            }, {
                                id: 2345656572,
                                date: "10/10/2020",
                                description: "payment to asdasd",
                                debit: 10.00,
                                credit: 0,
                                balance: 1244.455
                            }, {
                                id: 2345656573,
                                date: "09/10/2020",
                                description: "received money from dec",
                                debit: 0,
                                credit: 20.00,
                                balance: 1224.455
                            }]
                        })
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "GET",
                    "path": "/transactions/76457423",
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({
                            transactions: [{
                                id: 764574231,
                                date: "10/10/2020",
                                description: "repayment",
                                debit: 1000.00,
                                credit: 0,
                                balance: 560000.250
                            }, {
                                id: 764574232,
                                date: "10/09/2020",
                                description: "repayment 2",
                                debit: 1000.00,
                                credit: 0,
                                balance: 561000.250
                            }]
                        }),
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "GET",
                    "path": "/transactions/344343223",
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({
                            transactions: [{
                                id: 3443432231,
                                date: "15/10/2020",
                                description: "payment to ABC",
                                debit: 10.00,
                                credit: 0,
                                balance: 340.12
                            }, {
                                id: 3443432232,
                                date: "10/10/2020",
                                description: "payment to asdasd",
                                debit: 10.00,
                                credit: 0,
                                balance: 350.12
                            }, {
                                id: 3443432233,
                                date: "09/10/2020",
                                description: "received money from dec",
                                debit: 0,
                                credit: 20.00,
                                balance: 360.12
                            }]
                        }),
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "GET",
                },
                not: {
                    equals: {
                        "path": "/transactions/234565657",
                    }
                },
                not: {
                    equals: {
                        "path": "/transactions/76457423",
                    }
                },
                not: {
                    equals: {
                        "path": "/transactions/344343223",
                    }
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 404,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({
                            error: "No transactions."
                        })
                    }
                }
            ]
        },
    ];
    const imposter = {
        port: settings.transactions_service_port,
        protocol: 'http',
        allowCORS: true,
        "recordRequests": true,
        stubs: stubs,
    };
    return mbHelper.postImposter(imposter);
}

module.exports = { getUserTransactions };
const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function getUserAccounts() {
    const stubs = [
        {
            predicates: [{
                equals: {
                    method: "GET",
                    "path": "/accounts/john123",
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
                            accounts: [{
                                id: 234565657,
                                type: 'SAVINGS',
                                name: 'personal',
                                current_balance: 1234.455,
                                available_funds: 1234.455,
                            },
                            {
                                id: 76457423,
                                type: 'LOAN',
                                name: 'homeloan',
                                current_balance: 560000.250,
                                available_funds: 560000.250
                            },
                            {
                                id: 344343223,
                                type: 'EVERYDAY',
                                name: 'salaryAccount',
                                current_balance: 340.12,
                                available_funds: 340.12,
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
                },
                not: {
                    equals: {
                        "path": "/accounts/john123",
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
                            error: "No accounts."
                        })
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "POST",
                    "path": "/accounts"
                },
                exists: {
                    "body": {
                        "accountType": true,
                        "name": true,

                    }
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
                            message: "success"
                        })
                    }
                }
            ]
        },
    ];
    const imposter = {
        port: settings.accounts_service_port,
        protocol: 'http',
        allowCORS: true,
        "recordRequests": true,
        stubs: stubs,
    };
    return mbHelper.postImposter(imposter);
}

module.exports = { getUserAccounts };
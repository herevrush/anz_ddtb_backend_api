const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function loginUser() {
    const stubs = [
        {
            predicates: [{
                equals: {
                    method: "POST",
                    "path": "/auth/login",
                    body: { "username": "john123", "password": "sample" }
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
                            message: "logged in successfully", user: {
                                name: "John Smith",
                                username: "john123",
                                token: "12345"
                            }
                        })
                    }
                }
            ]
        },
        {
            predicates: [{
                equals: {
                    method: "POST",
                    "path": "/auth/login",
                },
                not: {
                    equals: {
                        body: { "username": "john123", "password": "sample" }
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
                            error: "Login failed try again."
                        })
                    }
                }
            ]
        },
    ];
    const imposter = {
        port: settings.login_service_port,
        protocol: 'http',
        allowCORS: true,
        "recordRequests": true,
        stubs: stubs,
    };
    return mbHelper.postImposter(imposter);
}

// function loginNoUser() {
//     const stubs = [

//         {
//             predicates: [{
//                 equals: {
//                     "path": "/auth/login",
//                 }
//             }],
//             responses: [
//                 {
//                     is: {
//                         statusCode: 400,
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({
//                             message: "Login failed try again."
//                         })
//                     }
//                 }
//             ]
//         },
//     ];


//     const imposter = {
//         port: settings.login_service_port,
//         protocol: 'http',
//         allowCORS: true,
//         "recordRequests": true,
//         stubs: stubs,
//     };

//     return mbHelper.postImposter(imposter);
// }
// function loginUserFailed() {
//     const stubs = [

//         {
//             predicates: [{
//                 not: {
//                     equals: {
//                         "path": "/auth/login",
//                         form: { username: "john123", password: "sample" }
//                     },
//                 }


//             }],
//             responses: [
//                 {
//                     is: {
//                         statusCode: 400,
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({
//                             message: "Login failed try again."
//                         })
//                     }
//                 }
//             ]
//         }
//     ];


//     const imposter = {
//         port: settings.login_service_port,
//         protocol: 'http',
//         allowCORS: true,
//         "recordRequests": true,
//         stubs: stubs,
//     };

//     return mbHelper.postImposter(imposter);
// }
module.exports = { loginUser };
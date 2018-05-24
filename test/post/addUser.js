var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');

module.exports = {

    addUser: function (sessionId,email,displayAs,password,roles, numberOfUsers) {
        var x = 0;
        var addUserPromise = new Promise(function (resolve, reject) {
            var intervalID = setInterval(function () {
                if (x == numberOfUsers) {
                    clearInterval(intervalID);
                    resolve("Passed")
                } else {
                    chakram.post(testConfig.APP_URL + testConfig.ADD_USER_API, undefined,
                        {
                            form: {
                                "sessionId":sessionId,
                                "emailAddress":email+x+'@nilavodev.com',
                                "password":password,
                                "displayAs":displayAs+x,
                                "roles":roles,
                            },
                            json: true,

                        }).then(function () {
                        x++
                        return chakram.wait()
                    })
                    console.log('User ' + x + ' created')
                }
            }, 1000);
        });
        return addUserPromise;
    }
}
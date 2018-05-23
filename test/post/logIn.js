var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    logIn:function (username,password) {
        var loginPromise=chakram.post(testConfig.APP_URL+testConfig.LOGIN_API,undefined,
            {
                form: {
                    "username":username,
                    "password":password
                },
                json: true,
            })
        return loginPromise
    }
}
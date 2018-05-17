var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    logIn:function (username,password) {
        var loginPromise=chakram.post(testConfig.APP_URL+testConfig.LOGIN_API,undefined,
            {
                form: {
                    "username":username,
                    "password":password,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                json: true,

            })
        return loginPromise
    }

}
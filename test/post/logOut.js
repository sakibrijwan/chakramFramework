var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    logOut:function (sessionId) {
        var logOutPromise=chakram.post(testConfig.APP_URL+testConfig.LOGOUT_API,undefined,
            {
                form: {
                    "sessionId":sessionId,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true,
            })
        return logOutPromise
    }

}
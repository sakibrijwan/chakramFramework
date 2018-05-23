var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    addUser:function (sessionId,email,displayAs,password,roles) {
        var addUserPromise=chakram.post(testConfig.APP_URL+testConfig.ADD_USER_API,undefined,
            {
                form: {
                    "sessionId":sessionId,
                    "emailAddress":email,
                    "password":password,
                    "displayAs":displayAs,
                    "roles":roles,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true,
            })
        expect()
        return addUserPromise
    }
}
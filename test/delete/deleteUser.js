var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    deleteUserName:function (sessionId,userId) {
        var deleteUserNamePromise=chakram.post(testConfig.APP_URL+testConfig.DELETE_USER_API,undefined,
            {
                form: {
                    "sessionId":sessionId,
                    "userId":userId,
                },
                json: true,
            })
        return deleteUserNamePromise
    }
}
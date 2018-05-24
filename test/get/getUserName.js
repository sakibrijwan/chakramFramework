var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    getUserName:function (sessionId,userId,company) {
        var getUserNamePromise=chakram.post(testConfig.APP_URL+testConfig.GET_USER_NAME_API,undefined,
            {
                form: {
                    "sessionId":sessionId,
                    "userId":userId,
                    "company":company
                },
                json: true,
            })
        return getUserNamePromise
    }
}
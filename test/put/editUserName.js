var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    editUserName:function (sessionId,userId,firstName,company) {
        var editUserNamePromise=chakram.post(testConfig.APP_URL+testConfig.GET_USER_NAME_API,undefined,
            {
                form: {
                    "sessionId":sessionId,
                    "userId":userId,
                    "firstName":firstName,
                    "comapany":company
                },
                json: true,
            })
        return editUserNamePromise
    }
}
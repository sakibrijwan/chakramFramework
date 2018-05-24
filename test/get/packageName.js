var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');


module.exports={

    getPackageName:function (sessionId,packageId) {
        var getPackageNamePromise=chakram.get(testConfig.APP_URL+testConfig.GET_PACKAGE_NAME_API,undefined,
            {
                form: {
                    "sessionId":sessionId,
                    "packageId":packageId
                },
                json: true,
            })
        return getPackageNamePromise
    }
}
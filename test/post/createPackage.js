var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');

module.exports = {

    createPackage: function (sessionId, packageName, numberOfPackages, fileName) {
        var x = 0;
        var createPackagePromise = new Promise(function (resolve, reject) {
            var intervalID = setInterval(function () {
                if (x == numberOfPackages) {
                    clearInterval(intervalID);
                    resolve("Passed")
                } else {
                    chakram.post(testConfig.APP_URL + testConfig.ADD_PACKAGE_API, undefined,
                        {
                            formData: {
                                "sessionId": sessionId,
                                "name": packageName + x,
                                file:
                                    {
                                        value: 'this is a test file from chakram',
                                        options: {filename: fileName, contentType: null}
                                    }

                            },
                            json: true,

                        }).then(function () {
                        x++
                        return chakram.wait()
                    })
                    console.log('Package ' + x + ' created')
                }

            }, 1000);

        });
        return createPackagePromise;
    }

}

var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');

module.exports = {

    createWorkspace: function (sessionId, workspaceName, numberOfWorkspace, fileName) {
        var x = 0;
        var createWorkspacePromise = new Promise(function (resolve, reject) {
            var intervalID = setInterval(function () {
                if (x == numberOfWorkspace) {
                    clearInterval(intervalID);
                    resolve("Passed")
                } else {
                    chakram.post(testConfig.APP_URL + testConfig.ADD_WORKSPACE_API, undefined,
                        {
                            formData: {
                                "sessionId": sessionId,
                                "name": workspaceName + x,
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
                    console.log('Workspace ' + x + ' created')
                }
            }, 1000);
        });
        return createWorkspacePromise;
    }
}

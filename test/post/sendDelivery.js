var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');

module.exports = {

    sendDelivery: function (getSessionId, recipient, deliveryName, numberOfDelivery) {
        var x = 0;
        var sendDeliveryPromise = new Promise(function (resolve, reject) {
            var intervalID = setInterval(function () {
                if (x == numberOfDelivery) {
                    clearInterval(intervalID);
                    resolve("Passed")
                } else {
                   chakram.post(testConfig.APP_URL + testConfig.EXPRESS_DELIVERY_API, undefined,
                        {
                            formData: {
                                "sessionId": getSessionId,
                                "deliveryTo": recipient,
                                "deliveryName": deliveryName + x
                            },
                            json: true,

                        }).then(function () {
                        x++
                        return chakram.wait()
                    })
                    console.log('Delivery ' + x + ' created')
                }
            }, 1000);
        });
        return sendDeliveryPromise;
    }
}

var chakram = require('chakram');
expect = chakram.expect;

var testConfig = require('../json/config');
var sendDelivery = require('../json/delivery')

module.exports = {

    sendDelivery: function (getSessionId, recipient, deliveryName, numberOfDelivery) {
        var x = 0;
        var promise1 = new Promise(function(resolve, reject) {
            var intervalID = setInterval(function () {
                if (x == numberOfDelivery) {
                    clearInterval(intervalID);
                    resolve("test")
                }
                var sendDeliveryPromise = chakram.post(testConfig.APP_URL + testConfig.EXPRESS_DELIVERY_API, undefined,
                    {
                        formData: {
                            "sessionId": getSessionId,
                            "deliveryTo": recipient,
                            "deliveryName": deliveryName + x
                        },
                        json: true,

                    }).then(function (value) {
                    x++
                    console.log('Delivery ' + x + ' created')
                    return chakram.wait()
                })

            }, 1000);
            //setTimeout(resolve, 100, 'foo');
        });
        return promise1;

        // expect(getSessionId).to.have.status(200);
        //return sendDeliveryPromise
    }

}

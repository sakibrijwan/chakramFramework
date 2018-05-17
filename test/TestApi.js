var chakram = require('chakram');
expect = chakram.expect;

var login=require("./json/login");
var delivery=require('./json/delivery')

var sendDeliveryApi=require('./post/sendDelivery')
var logInApi=require('./post/logIn')
var logOutApi=require('./post/logOut')

var username=login.userLogin.username
var password=login.userLogin.password
var recipient=delivery.sendExpressDelivery.recipient
var deliveryName=delivery.sendExpressDelivery.deliveryName
var numberOfDeliveries=delivery.numberOfDeliveries

var sessionId


describe('SFT API testing',function () {

        beforeEach('Before All',function(done){
            console.log('before each')
            if(sessionId){
                done()
            }else{
                sessionId=logInApi.logIn(username,password)
                    .then(function(response){
                        sessionId=response.body.sessionId
                        done();
                    });
            }
        })

        after('Sign out',function(){
            console.log('after all')

            logOutApi.logOut(sessionId).then(function () {
                console.log('signed out')

            })
        })


        it("should sign in and send "+delivery.numberOfDeliveries+" deliveries", function (done) {
            console.log('it')
            this.timeout(1000000);
            sendDeliveryApi.sendDelivery(sessionId, recipient, deliveryName, numberOfDeliveries).then(function (value) {
                console.log(value)
                done()
            })
        })
})
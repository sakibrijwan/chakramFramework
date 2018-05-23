var chakram = require('chakram');
expect = chakram.expect;

var login=require("./json/login");
var delivery=require('./json/delivery')
var package=require('./json/package')
var workspace=require('./json/workspace')
var admin=require('./json/admin')


var sendDeliveryApi=require('./post/sendDelivery')
var logInApi=require('./post/logIn')
var logOutApi=require('./post/logOut')
var createPackageApi=require('./post/createPackage')
var createWorkspaceApi=require('./post/workspace')
var addUserApi=require('./post/addUser')

var adminUser=admin.username
var adminPass=admin.password

var username=login.userLogin.username
var password=login.userLogin.password

var recipient=delivery.sendExpressDelivery.recipient
var deliveryName=delivery.sendExpressDelivery.deliveryName
var numberOfDeliveries=delivery.numberOfDeliveries

var packageName=package.createPackage.packageName
var numberOfPackages=package.numberOfPackages
var fileName=package.createPackage.file

var workspaceName=workspace.createWorkspace.workspaceName
var numberOfWorkspace=workspace.numberOfWorkspaces

var email=admin.addUser.emailAddress
var displayAs=admin.addUser.displayAs
var roles=admin.addUser.roles

var sessionId


describe('SFT API testing',function () {

        before('Before All',function(done){
            console.log('Sign in as '+username)
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
    describe('Send Express delivery', function () {
        describe('User '+username, function () {
            it('should sign and send '+delivery.numberOfDeliveries+" deliveries", function (done) {
                this.timeout(1000000);
                sendDeliveryApi.sendDelivery(sessionId, recipient, deliveryName, numberOfDeliveries).then(function () {
                    done()
                })
            })
        });
    });
    describe('Create package', function () {
        describe('User '+username, function () {
            it('should sign and create '+package.numberOfPackages+" packages", function (done) {
                this.timeout(1000000);
                createPackageApi.createPackage(sessionId, packageName, numberOfPackages,fileName).then(function () {
                    done()
                })
            })
        });
    });

    describe('Create workspace', function () {
        describe('User '+username, function () {
            it('should create '+workspace.numberOfWorkspaces+" workspaces", function (done) {
                this.timeout(1000000);
                createWorkspaceApi.createWorkspace(sessionId, workspaceName, numberOfWorkspace,fileName).then(function () {
                    done()
                })
            })
        });
    });

    // describe('Add User', function () {
    //     describe('User '+username, function () {
    //         it('should add user '+admin.addUser.emailAddress, function (done) {
    //             this.timeout(1000000);
    //             addUserApi.addUser(sessionId,email,displayAs,password,roles).then(function () {
    //                 done()
    //             })
    //         })
    //     });
    // });

    after('Sign out',function(){
        logOutApi.logOut(sessionId).then(function () {
            console.log('Signed out '+username)
        })
    })

})
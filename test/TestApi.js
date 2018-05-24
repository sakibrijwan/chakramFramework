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
var createWorkspaceApi=require('./post/addWorkspace')
var addUserApi=require('./post/addUser')
var getPackageNameApi=require('./get/packageName')
var getUserNameApi=require('./get/getUserName')
var editUserNameApi=require('./put/editUserName')
var deleteUserNameApi=require('./delete/deleteUser')

var username=admin.username
var password=admin.password

// var username=login.userLogin.username
// var password=login.userLogin.password

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
var numberOfUsers=admin.numberOfUsers


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
    // describe('Send Express delivery', function () {
    //     describe('User '+username, function () {
    //         it('should send '+delivery.numberOfDeliveries+" deliveries", function (done) {
    //             this.timeout(1000000);
    //             sendDeliveryApi.sendDelivery(sessionId, recipient, deliveryName, numberOfDeliveries).then(function () {
    //                 done()
    //             })
    //         })
    //     });
    // });
    // describe('Create package', function () {
    //     describe('User '+username, function () {
    //         it('should create '+package.numberOfPackages+" packages", function (done) {
    //             this.timeout(1000000);
    //             createPackageApi.createPackage(sessionId, packageName, numberOfPackages,fileName).then(function () {
    //                 done()
    //             })
    //         })
    //     });
    // });
    //
    // describe('Create workspace', function () {
    //     describe('User '+username, function () {
    //         it('should create '+workspace.numberOfWorkspaces+" workspaces", function (done) {
    //             this.timeout(1000000);
    //             createWorkspaceApi.createWorkspace(sessionId, workspaceName, numberOfWorkspace,fileName).then(function () {
    //                 done()
    //             })
    //         })
    //     });
    // });

    describe('Add User', function () {
        describe('User '+username, function () {
            it('should add user '+admin.addUser.emailAddress, function (done) {
                this.timeout(1000000);
                addUserApi.addUser(sessionId,email,displayAs,password,roles,numberOfUsers).then(function () {
                    done()
                })
            })
        });
    });

    // describe('Get User Name', function () {
    //     describe('User '+username, function () {
    //         it('should get the username with id 801', function (done) {
    //             this.timeout(1000000);
    //             getUserNameApi.getUserName(sessionId, 802,'Nilavo').then(function (value) {
    //                 console.log('Username is:'+value.body.userVO.username)
    //                 done()
    //             })
    //         })
    //     });
    // });

    // describe('Delete User', function () {
    //     describe('User '+username, function () {
    //         it('should delete the username with id 801', function (done) {
    //             this.timeout(1000000);
    //             deleteUserNameApi.deleteUserName(sessionId, 766).then(function (value) {
    //                 console.log('User has been deleted')
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
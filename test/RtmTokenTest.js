/**
 * run this test with command:
 * nodeunit AccessTokenTest.js
 * see https://github.com/caolan/nodeunit
 */
 var RtmTokenBuilder = require('../src/RtmTokenBuilder').RtmTokenBuilder;
 var Priviledges = require('../src/AccessToken').priviledges;
 
 var appID = "3c806b5312094af7a8620a919264f629";
 var appCertificate = "cf2d796100f1421ea0aa0764da4867aa";
 var account = "test_user";
 var salt = 1;
 var ts = 1111111;
 var expireTimestamp = 1446455471;
 
 exports.RtmToken_Test = function (test) {
   var expected = "006970CA35de60c44645bbae8a215061b33IAAsR0qgiCxv0vrpRcpkz5BrbfEWCBZ6kvR6t7qG/wJIQob86ogAAAAAEAABAAAAR/QQAAEA6AOvKDdW";
 
   var builder = new RtmTokenBuilder(appID, appCertificate, account);
   builder.key.salt = salt;
   builder.key.ts = ts;

   builder.setPrivilege(Priviledges.kRtmLogin, expireTimestamp)
 
   var actual = builder.buildToken();
   test.equal(expected, actual);
   test.done();
 };
 
 // test uid = 0
 exports.RtmToken_Test2 = function (test) {
   var expected = "006970CA35de60c44645bbae8a215061b33IABR8ywaENKv6kia6iUU6P54g017Bi6Ym9sIGdt9f3sLLYb86ogAAAAAEAABAAAAR/QQAAEA6ANkAAAA";
 
   var builder = new RtmTokenBuilder(appID, appCertificate, account);
   builder.key.salt = salt;
   builder.key.ts = ts;

   builder.setPrivilege(Priviledges.kRtmLogin, 100)
 
   var actual = builder.buildToken();
   test.equal(expected, actual);
   test.done();
 };
 
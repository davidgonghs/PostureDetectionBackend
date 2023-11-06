"use strict";
exports.__esModule = true;
//import
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
//import the client
var client_1 = require("../client");
//company table params
var companyTableParams = {
    TableName: 'UserLog',
    KeySchema: [
        { AttributeName: "user_id", KeyType: "HASH" },
        { AttributeName: "login_date", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
        { AttributeName: "user_id", AttributeType: "N" },
        { AttributeName: "login_date", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    }
};
var command = new client_dynamodb_1.CreateTableCommand(companyTableParams);
//client send command
client_1["default"].send(command).then(function (data) {
    console.log("Table created", data);
})["catch"](function (error) {
    console.error(error);
});

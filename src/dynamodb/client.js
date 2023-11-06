"use strict";
exports.__esModule = true;
//import aws clients and lib from aws-sdk
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//create a new instance of the DynamoDBClient
var client = new client_dynamodb_1.DynamoDBClient({
    region: "ap-southeast-1"
});
//create a new instance of the DynamoDBDocumentClient
var docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
//export the clients
exports["default"] = docClient;

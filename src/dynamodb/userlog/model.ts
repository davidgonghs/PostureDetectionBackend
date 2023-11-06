//import
import {CreateTableCommand, CreateTableInput} from "@aws-sdk/client-dynamodb";
//import the client
import client from "../client";

//company table params
const companyTableParams : CreateTableInput = {
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
        WriteCapacityUnits: 2,
    },
};

const command = new CreateTableCommand(companyTableParams);
//client send command
client.send(command).then(
    (data) => {
        console.log("Table created", data);
    }).catch(
    (error) => {
        console.error(error);
    });
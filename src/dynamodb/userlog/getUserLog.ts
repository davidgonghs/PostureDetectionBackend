import {ScanCommand, ScanCommandInput} from "@aws-sdk/lib-dynamodb";
import docClient from "../client";

const getAllUserLogs = async () => {
    const params: ScanCommandInput = {
        TableName: "UserLog"
    };

    const command = new ScanCommand(params);
    let data = await docClient.send(command);
    return data.Items;
}

//get Companies by country
const getUserLogsByUserId = async (user_id: number) => {
    const params: ScanCommandInput = {
        TableName: "UserLog",
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id
        }
    };

    const command = new ScanCommand(params);
    let data = await docClient.send(command);
    return data.Items;
}

//export all functions
export default {
    getAllUserLogs: getAllUserLogs,
    getUserLogsByUserId: getUserLogsByUserId
}
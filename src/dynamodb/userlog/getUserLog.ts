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


//get activity user count by date
const getActivityUser = async (start:number, end:number) => {
    // user_id id deduplication
    // login_date include today
    //
    // const start = new Date();
    // start.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
    // start.getTime(); // Convert to milliseconds since Unix epoch




    const params = {
        TableName: "UserLog",
        FilterExpression: "attribute_exists(user_id) AND attribute_exists(login_date) AND login_date >= :start AND login_date < :end",
        ProjectionExpression: "user_id, login_date",
        ExpressionAttributeValues: {
            ":start": start,
            ":end": end
        },
    };

    const command = new ScanCommand(params);
    const data = await docClient.send(command);

    //get count
    const user_id = [];
    const login_date = [];
    data.Items.forEach((item) => {
        user_id.push(item.user_id);
        login_date.push(item.login_date);
    });

    //deduplication
    const unique_user_id = [...new Set(user_id)];
    const count = unique_user_id.length;

    return count;
};

//export all functions
export default {
    getAllUserLogs: getAllUserLogs,
    getUserLogsByUserId: getUserLogsByUserId,
    getActivityUser: getActivityUser
}
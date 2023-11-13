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
const getActivityUser = async (start, end) => {
    try {
        const countsByDate = [];
        let totalUser = 0;

        // Convert start and end to Date objects
        const startDate = new Date(start);
        const endDate = new Date(end);

        // Iterate through each date in the range
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const dateString = currentDate.toISOString().split('T')[0]; // Get the date part only

            const params = {
                TableName: "UserLog",
                FilterExpression: "attribute_exists(user_id) AND attribute_exists(login_date) AND contains(login_date, :specificDate)",
                ProjectionExpression: "user_id, login_date",
                ExpressionAttributeValues: {
                    ":specificDate": dateString,
                },
            };

            const command = new ScanCommand(params);
            const data = await docClient.send(command);

            // Get unique user_ids for the current date
            const uniqueUserIds = Array.from(new Set(data.Items.map(item => item.user_id)));

            countsByDate.push({
                date: dateString,
                count: uniqueUserIds.length,
            });

            totalUser += uniqueUserIds.length;
        }

        return {
            countsByDate,
            totalUser };
    } catch (error) {
        console.error('Error fetching activity count by date range:', error);
        throw new Error('Error fetching activity count by date range');
    }
};


const getActivityToday = async () => {
    const startDate = new Date();
    const dateString = startDate.toISOString().split('T')[0]; // Get the date part only
    const params = {
        TableName: "UserLog",
        FilterExpression: "attribute_exists(user_id) AND attribute_exists(login_date) AND contains(login_date, :specificDate)",
        ProjectionExpression: "user_id, login_date",
        ExpressionAttributeValues: {
            ":specificDate": dateString,
        },
    };

    const command = new ScanCommand(params);
    const data = await docClient.send(command);
    return {todayActivity: data.Items.length};
}
//export all functions
export default {
    getAllUserLogs: getAllUserLogs,
    getUserLogsByUserId: getUserLogsByUserId,
    getActivityUser: getActivityUser,
    getActivityToday: getActivityToday
}
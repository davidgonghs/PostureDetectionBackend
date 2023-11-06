//import
import {PutCommand, PutCommandInput} from "@aws-sdk/lib-dynamodb";
import { UserLog } from '../../user-log/model/userlog.model';
import docClient from '../client';

//create a new function to update  user log to dynamodb
const putUserLog = (userLog: UserLog) => {
    //create a new instance of the PutCommandInput
    const params: PutCommandInput = {
        TableName: "UserLog",
        Item: {
            user_id: +userLog.user_id,
            login_date: userLog.login_date,
            user_name: userLog.user_name,
            user_email: userLog.user_email,
            ip_address: userLog.ip_address,
            platform: userLog.platform,
            system: userLog.system
        }
    };

    const command = new PutCommand(params);
    //return the result of the put command
    return docClient.send(command);
}

export default putUserLog;
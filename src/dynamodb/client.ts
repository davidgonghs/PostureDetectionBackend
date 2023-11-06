//import aws clients and lib from aws-sdk
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";

//create a new instance of the DynamoDBClient
const client = new DynamoDBClient({
    region: "ap-southeast-1"
});

//create a new instance of the DynamoDBDocumentClient
const docClient = DynamoDBDocumentClient.from(client);

//export the clients
export default docClient;
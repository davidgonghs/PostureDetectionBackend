# Serverless NestJS with Serverless PostgreSQL

## Installation

```bash
$ yarn
```

## Running the app

```bash
# watch mode
$ yarn start:dev
```

Note: Before starting the server ,ensure the database connection details is updated in the `.env`

## Deploy to Cloud

1. Configure your AWS credentials using `aws configure` command.
2. `serverless deploy`

Note: Ensure you have Serverless Framework installed. If not , you can install it globally using `npm install -g serverless`


## Test Serverless Locally

`serverless offline`

## Build table in AWS Dynamodb
    go to src/dynamodb/xxx/model.ts
    ```bash
    $ tsc model.ts
    $ node model.js
    ```

## create object folder
    ```bash
    $ nest g resource xxxObjectNamexxx --no-spec
    ```

## upload zip file to s3
    ```bash
    $ aws s3 cp ./posturedetection.zip s3://posturedetection.backend.code/code.zip
    $ aws s3 cp ./nodejs.zip s3://posturedetection.backend.code/layer.zip
    ```
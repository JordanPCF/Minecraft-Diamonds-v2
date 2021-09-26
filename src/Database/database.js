// import { cantor_pairing, inverse_cantor } from './cantor_hash.js';
import { data } from '../../tests/sampleData.js'

AWS.config.update({
  region: "us-west-2"
});

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: "us-west-2:bf70fc7a-264d-4bea-b2e5-7470e04381d9"
});


var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

class Database {
    constructor(table_name) {
        this.table_name = table_name
    }

    setUpDB() {
        // TODO: don't attempt other functions if table exists
        // return new Promise(function (resolve, reject) {

        // })
        
        try {
            this.createTable();
            this.addGSI();
            this.loadData();
        } catch {
            console.log('Table exists');
        }

    }

    createTable () {
        var params = {
            TableName : this.table_name,
            KeySchema: [
                { AttributeName: "PK", KeyType: "HASH"},
                { AttributeName: "SK", KeyType: "RANGE" }
            ],
            AttributeDefinitions: [       
                { AttributeName: "PK", AttributeType: "S" },
                { AttributeName: "SK", AttributeType: "S" }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        dynamodb.createTable(params, function (err) {
            if (err) {
                console.log('Table already exists');
            }
        });
    }

    addGSI() {
        var params = {
            TableName : this.table_name,
            AttributeDefinitions: [       
                { AttributeName: "BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY",
                  AttributeType: "S" },
                { AttributeName: "CHUNK#PATCH", AttributeType: "S" }
            ],
            GlobalSecondaryIndexUpdates: [
                {
                    Create: {
                        IndexName: "GSI1Index",
                        KeySchema: [
                            { AttributeName: "BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY", KeyType: "HASH"},
                            { AttributeName: "CHUNK#PATCH", KeyType: "RANGE"}
                        ],
                        Projection: {
                            ProjectionType: "ALL"
                        },
                        ProvisionedThroughput: {       
                            ReadCapacityUnits: 5,
                            WriteCapacityUnits: 5
                        }
                    }
                }
            ]
        };

        dynamodb.updateTable(params);
    }

    loadData () {
        var t_name = this.table_name // had issue binding 'this'

        data.forEach(function (cluster) {
            var params = {
                    TableName: t_name,
                    Item: {
                        "PK": cluster['PK'],
                        "SK": cluster['SK'],
                        "BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY": cluster['BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY'],
                        "CHUNK#PATCH": cluster['CHUNK#PATCH'],
                        "INFO": cluster['INFO']
                    }
            };
            docClient.put(params, function (err, data) {
                if (err) {
                    console.log(err)
                }
            })
        });
    }

    pkQuery(patch_type) {

        var params = {
            TableName : this.table_name,
            KeyConditionExpression: "#pk = :patch_type",
            ExpressionAttributeNames:{
                "#pk": "PK"
            },
            ExpressionAttributeValues: {
                ":patch_type": patch_type
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                return data
            }
        });
    return 0
    }

}



export {Database};

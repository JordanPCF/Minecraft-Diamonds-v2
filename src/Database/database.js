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
        this.table_name = table_name;
        this.GSI_key = {
            '1': '#GRAVEL#NO#NO',
            '2': '#GRAVEL#YES#NO',
            '3': '#GRAVEL#NO#YES',
            '4': '#GRAVEL#YES#YES',
            '5': '#CLAY#NO#NO',
            '6': '#CLAY#YES#NO',
            '7': '#CLAY#NO#YES',
            '8': '#CLAY#YES#YES'
        };
    }

    setUpDB() {
        // TODO: don't attempt other functions if table exists
        return new Promise(function (resolve, reject) {
            try {
                this._createTable();
                this._addGSI();
                this._loadData();
            } catch {
                console.log('Table exists');
            }
            resolve("")
        });

        

    }

    gsiQuery(specifications) {
        var t_name = this.table_name;
        var case_ = Object.keys(specifications)[0];
        var index = specifications[case_] + this.GSI_key[case_];

        return new Promise(function (resolve, reject) {
            var params = {
                TableName : t_name,
                IndexName: "GSI1Index",
                KeyConditionExpression: "#gsi1 = :case",
                ExpressionAttributeNames:{
                    "#gsi1": "BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY"
                },
                ExpressionAttributeValues: {
                    ":case": index
                }
            };

            docClient.query(params, function(err, data) {
                if (err) {
                    console.log(err);
                    resolve(0);
                } else {
                    // console.log(data);
                    // to match what apexcharts wants
                    resolve({x: case_, y: data});
                }
            });
        })

    }

    pkQuery(patch_type) {
        var t_name = this.table_name;

        return new Promise(function (resolve, reject) {

            var params = {
                TableName : t_name,
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
                    resolve(0);
                } else {
                    // console.log(data);
                    resolve(data);
                }
            });
        });
    
    }

    _createTable () {
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

    _addGSI() {
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

    _loadData () {
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

    

}



export {Database};

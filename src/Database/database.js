// import { cantor_pairing, inverse_cantor } from './cantor_hash.js';

AWS.config.update({
  region: "us-west-2"
  // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
  // endpoint: 'http://localhost:8000',
  /*
    accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB. 
    For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  */
  // accessKeyId: "fakeMyKeyId",
  // secretAccessKey: "fakeSecretAccessKey"
});

  /* 
     Uncomment the following code to configure Amazon Cognito and make sure to 
     remove the endpoint, accessKeyId and secretAccessKey specified in the code above. 
     Make sure Cognito is available in the DynamoDB web service region (specified above).
     Finally, modify the IdentityPoolId and the RoleArn with your own.
  */

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: "us-west-2:bf70fc7a-264d-4bea-b2e5-7470e04381d9"
// RoleArn: "arn:aws:iam::871954724261:role/Cognito_minecraftdiamondsAuth_Role"
});


var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function createDiamondTable() {
    document.getElementById('fileinput').addEventListener('change', loadData, false)
    var params = {
        TableName : "DiamondLocations",
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

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "Created table: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function deleteDiamondTable() {
    var params = {
        TableName : "DiamondLocations"
    };

    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to delete table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "Table deleted.";
        }
    });
}

function addGSI() {
    var params = {
        TableName : "DiamondLocations",
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

    dynamodb.updateTable(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to update table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "Updated table: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function addItem() {
    var params = {
        Item: {
            "PK": "PATCH#GRAVEL",
            "SK": "SWAMP#0413#1",
            "BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY": "SWAMP#GRAVEL#YES#YES",
            "CHUNK#PATCH": "0413#1",
            "CHUNK_ID": 413,
            "NUM_DIAMONDS": 4,
            "PATCH_AREA": 8,
            "DIAMOND_LOCATIONS": {"X": [3122, 3122, 3123, 3123],
                                  "Y": [12, 12, 12, 12],
                                  "Z": [234, 235, 234, 235]
                              },
            "PATCH_CENTER_X": 3125,
            "PATCH_CENTER_Z": 240,
            "DIAMOND_Y_RANGE": [12, 12]      
        },
        TableName: "DiamondLocations"
    };
    docClient.put(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function loadData(evt) {
    var file = evt.target.files[0];

    if (file) {
        var r = new FileReader();

        r.onload = function(e) {
            var contents = e.target.result;
            var allDiamonds = JSON.parse(contents);

            allDiamonds.forEach(function (cluster) {
                var params = {
                    TableName: "DiamondLocations",
                    Item: {
                        "PK": cluster.PK,
                        "SK": cluster.SK,
                        "BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY": cluster['BIOME#PATCH_TYPE#IS_CUT_OFF#IS_AT_BOUNDARY'],
                        "CHUNK#PATCH": cluster['CHUNK#PATCH'],
                        "INFO": cluster.INFO
                    }
                };
                docClient.put(params, function (err, data) {
                    if (err) {
                        document.getElementById('textarea').innerHTML += "Unable to add cluster: " + count + cluster.SK + "\n";
                        document.getElementById('textarea').innerHTML += "Error JSON: " + JSON.stringify(err) + "\n";
                    } else {
                        document.getElementById('textarea').innerHTML += "PutItem succeeded: " + cluster.SK + "\n";
                        textarea.scrollTop = textarea.scrollHeight;
                    }
                });
            });
        };
        r.readAsText(file);
    } else {
        alert("Could not read file");
    }  
}

function readItem() {
    var table = "DiamondLocations";
    var pk = "PATCH#GRAVEL";
    var sk = "SWAMP#0413#1";

    var params = {
        TableName: table,
        Key:{
            "PK": pk,
            "SK": sk
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function pkQuery(patch_type) {
    document.getElementById('textarea').innerHTML += "Querying for " + patch_type + "\n";

    var params = {
        TableName : "DiamondLocations",
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
            document.getElementById('textarea').innerHTML += "Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML += "Query results for " + patch_type + ": " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

window.createDiamondTable = createDiamondTable
window.addGSI = addGSI
window.deleteDiamondTable = deleteDiamondTable
window.addItem = addItem
window.readItem = readItem
window.pkQuery = pkQuery
window.loadData = loadData

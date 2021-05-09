const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    var params = {
    TableName: "usuarios-fake-news",
    Key:{
        "Username": { S: event.Username }
    },
        UpdateExpression: "set Email = :e, Password=:p",
        ExpressionAttributeValues:{
            ":e": { S: event.Email },
            ":p": { S: event.Password }
        },
        ReturnValues:"UPDATED_NEW"
    };

    dynamoDB.updateItem(params, function(err, data) {
        if (err){
            callback(err);
        } else {
            callback(null, data);
        }
    });
    
    return 
};

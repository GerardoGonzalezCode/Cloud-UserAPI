const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    const params = { Item:{ 
        "Username":{ 
            S: event.Username 
        }, "Email":{ 
            S: event.Email 
        }, "Password":{ 
            S: event.Password 
        } 
    }, 
    TableName: "usuarios-fake-news" } 
    dynamoDB.putItem(params, function(err, data) { 
        if (err){ 
            console.log(err, err.stack); // an error occurred 
            callback(err); 
        } 
        else { 
            console.log(data); 
            callback(null, data);
        } 
    });
    
    return params;
};

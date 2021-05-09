const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    const type = event.type;
    if(type === 'all'){
        const params = { TableName: "usuarios-fake-news" }
        dynamoDB.scan(params, function(err, data) {
            if (err){
                console.log(err, err.stack); // an error occurred
                callback(err);
            }
            else {
                console.log(data); // successful response
                const items = data.Items
                callback(null, items);}
            }
        );
    } else if (type === 'valid'){
        const params = {
            Key: {
                "Username": {
                    S: event.Username
                }
            },
        TableName: "usuarios-fake-news"
        };
    dynamoDB.getItem(params, function(err, data) {
        if (err){ callback(err); }
        else { callback(null, [{Username : +data.Item.Username.S, Password : +data.Item.Password.S}]) }
    });
    } else { callback(null, 'Something went wrong!'); }
};
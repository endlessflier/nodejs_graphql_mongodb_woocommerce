const os = require('os');

console.log("ENV => ",process.env.NODE_ENV);

const AWS = require('aws-sdk'),
    region = "us-east-2",
    secretName =  `mica-backend-${process.env.NODE_ENV}` 

const awsSecrets = () => {
	const client = new AWS.SecretsManager({ region });
	return new Promise((resolve, reject) => {
		client.getSecretValue({ SecretId : secretName }, (err, data) => {
			if (err) {
				reject(err); 
			} else {
				const secretsJSON = JSON.parse(data.SecretString);
				let secretsString = "";
				Object.keys(secretsJSON).forEach((key) => {
					secretsString += `${key}=${secretsJSON[key]}\n`;
				});
				resolve(secretsString);
			}
		});
	});
};

const awsHelper = {

     getSecrets:awsSecrets
}

export default  awsHelper;
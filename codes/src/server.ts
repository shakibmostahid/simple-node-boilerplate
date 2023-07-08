import * as process from "process";

const express = require('express');
const https = require("https");
const app = express();
const fs = require('fs');

const options = {
	key: fs.readFileSync(process.env.SSL_KEY_PATH),
	cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

https.createServer(options,app)
	.listen(8082, () => {
		console.log('sample project listening at 8082')
	});

app.get('/', function (req, res) {
	res.send('Hello World');
})

const server = app.listen(8081, function () {
	console.log("sample project listening at 8081")
});

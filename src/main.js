const express = require('express');
const multer = require('multer');
const puppeteer = require('puppeteer');

//const hostname = '127.0.0.1';
const port = 8000;

const app = express();
const multiPartFormMiddleware = multer({
	limits: {
		fileSize: 1e6,//1MB?
	}
});

app.use(express.json());
app.use(express.urlencoded());

const fields = [
	{
		name: 'data',
		maxCount: 1,
	},
	{
		name: 'template',
		maxCount: 1,
	}
];

app.post('/makepdf', multiPartFormMiddleware.fields(fields), async (request, response) => {
	//console.log(request.files);
	const dataFile = request.files.data[0];
	const templateFile = request.files.template[0];
	const json = JSON.parse(dataFile.buffer);
	const html = templateFile.buffer;
	console.log('json:', json);
	//console.log('html:', html.toString());
	//console.log(dataFile, templateFile);

	const keyValuePairs = json;

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setContent(html.toString());
	await page.evaluate((keyValuePairs) => {
		keyValuePairs.forEach((keyValuePair) => {
			const targetElement = document.getElementById(keyValuePair.id);
			if (targetElement) {
				targetElement.value = keyValuePair.value;
			}
			const debugArea = document.createElement("textarea");
			debugArea.innerText = JSON.stringify(keyValuePairs);
			document.body.appendChild(debugArea);
		});
	}, keyValuePairs);
	const pdf = await page.pdf();
	response.status(200).send(pdf);

	//make a dom object, fill in the data from json and then
	//ship the html off to headless chrome
	//
	//OR you made need to put the html into chrome first and then 
	//add in the values from the data object
	//response.send('Hello World');
	//response.send();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

//const server = http.createServer((request, response) => {
//	response.statusCode = 200;
//	response.setHeader('Content-Type', 'text/plain');
//	response.end('Hello World');
//	if (request.method === 'POST') {
//		let body = '';
//		request.on('data', (data) => {
//			body += data
//		});
//
//		request.on('end', () => {
//			const post = queryString.parse(body);
//			const htmlTemplate = post['html_template'];
//			const data = post['data'];
//			console.log('html template', htmlTemplate);
//			console.log('data', data);
//		});
//	}
//});
//
//server.listen(port, hostname, () => {
//	console.log(`Server running at http://${hostname}:${port}/`);
//});

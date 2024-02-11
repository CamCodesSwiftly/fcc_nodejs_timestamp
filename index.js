// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

// * handle empty string
app.get("/api", function (req, res) {
	const currentDate = new Date();
	const utcDate = currentDate.toUTCString();
	const milisecondsSinceEpoch = currentDate.getTime();
	return res.json({
		unix: milisecondsSinceEpoch,
		utc: utcDate,
	});
});

// * handle date
app.get("/api/:date", function (req, res) {
	// is the input a valid date string?
	// we can check this easily with Date.parse()
	// if it returns nAn, then it is not valid and we'll return an error
	if (!isNaN(Date.parse(req.params.date))) {
		const timestamp = Date.parse(req.params.date);
		const date = new Date(timestamp);
		const utcDate = date.toUTCString();
		console.log(req.params.date, "this is a date string");
		return res.json({
			unix: timestamp,
			utc: utcDate,
		});
	}

	// any non-integer in the string?
	const nonDigitRegex = /\D/g;
	console.log(req.params.date.match(nonDigitRegex));
	if (req.params.date.match(nonDigitRegex)) {
		console.log(
			req.params.date,
			"this is no date string, and no timestamp"
		);
		return res.json({
			error: "Invalid Date",
		});
	}

	// When we reach this point, the string MUST be only integers
	const timestamp = parseInt(req.params.date, 10);
	const date = new Date(timestamp);
	const utcDate = date.toUTCString();
	console.log(req.params.date, "this is a timestamp");
	return res.json({
		unix: timestamp,
		utc: utcDate,
	});
});

// listen for requests :)
var listener = app.listen(3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});

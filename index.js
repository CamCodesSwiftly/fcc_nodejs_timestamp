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
	// any non-integer in the string?
	for (const char of Array.from(req.params.date)) {
		if (isNaN(parseInt(char, 10))) {
			console.log(`${char} is not an integer.`);
			return res.json({
				error: "Invalid Date",
			});
		}

		// When we reach this point, the string MUST be only integers
		const miliseconds = parseInt(req.params.date, 10);
		const date = new Date(miliseconds);
		const utcDate = date.toUTCString();
		console.log(date);
		return res.json({
			unix: miliseconds,
			utc: utcDate,
		});
	}
});

// listen for requests :)
var listener = app.listen(3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});

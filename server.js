const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {

	var roman_string = req.query.roman

	var roman_values = {"I": 1, "V": 5, "X": 10, "L":50, "C":100, "D":500, "M":1000};

	var number = 0;

	while (roman_string.length > 1) {
		var current = roman_string[0];
		var next = roman_string[1];
		if (roman_values[current] < roman_values[next]) {
			var value = (roman_values[next] - roman_values[current]);
			number = number + value;
			roman_string = roman_string.substring(2, roman_string.length);
		} else {
			var value = roman_values[current];
			number = number + value;
			roman_string = roman_string.substring(1, roman_string.length);
		}

	}

	if (roman_string.length > 0 ) {
		var current = roman_string[0];
		var value = roman_values[current];
		number = number + roman_values[roman_string[0]];
		roman_string = roman_string.substring(1, roman_string.length);
	}

    res.send(number.toString());
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
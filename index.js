var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.render('index')
})

app.get('/search', function(req, res) {
	request("http://www.omdbapi.com/?s=" + req.query.title, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var results = JSON.parse(body);
			var movList = results.Search || [];
       		res.render('search', {list: movList, title: req.query.title})
		}
	})
})

app.get('/movies', function(req, res) {
	res.render('movies')
})

app.get('/search/:imdbID', function(req, res) {
	var index = req.params.imdbID
	request("http://www.omdbapi.com/?i=" + index + '&tomatoes=true&', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      	var results = JSON.parse(body);
      	var movList = results.Search || [];
        res.render('movies', movList)
    }
  })
})



app.listen(3000);
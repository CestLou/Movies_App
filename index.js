var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var db = require('./models/index.js')


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/search', function(req, res) {
	request("http://www.omdbapi.com/?s=" + req.query.title, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var results = JSON.parse(body);
			var movList = results.Search || [];
       		res.render('search', {'movList': movList, 'title': req.query.title})
		}
	})
})

app.get('/engine', function(req, res) {
	res.render('engine')
})

app.get('/movies', function(req, res) {
	res.render('movies')
})

app.get('/watchList', function(req, res) {
	db.Watch_List.findAll().done(function(err, data) {
		res.render('watchList', {'toWatch': data})		
	})
})

app.post('/watchList', function(req, res) {
	// console.log(req.body);
	db.Watch_List.findOrCreate({where: req.body}).spread(function(data, created) {
		res.send({data:data, created:created});
	}).catch(function(err) {
		if(err) throw err;
	})
})

// app.get('/watchList', function(req, res) {
// 	if (req.query.added === false) {
// 	res.render('sorry')
// 	} 
// })

app.get('/search/:imdbID', function(req, res) {
	var index = req.params.imdbID
	request("http://www.omdbapi.com/?i=" + index + '&tomatoes=true&', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      	var results = JSON.parse(body);
      	var list = results || [];
      	db.Watch_List.count({where:{imdb_code:list.imdbID}}).then(function(foundItemCount) {
      		var wasFound = foundItemCount > 0;
	        res.render('movies', {list: list, movieFound:wasFound, item:list})
      	})
    }
  })
})


app.delete('/watchList/:id', function(req, res) {
	db.Watch_List.destroy({where:{ id: req.params.id}}).then(function(deleteCount) {
		res.send({deleted: deleteCount})
	})
})



app.listen(3000);
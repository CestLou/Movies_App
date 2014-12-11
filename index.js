var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var db = require('./models/index.js')
var session = require('express-session')


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/search', function(req, res) {
	request("http://www.omdbapi.com/?s=" + req.query.title, function (error, response, body) {
		req.session.lastPage = "/search/" + req.query.title;
		if (!error && response.statusCode === 200) {
			var results = JSON.parse(body);
			results.prevSearch=req.session.lastPage;
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
	db.watchlist.findAll().done(function(err, data) {
		res.render('watchList', {'toWatch': data})		
	})
})

app.post('/watchList', function(req, res) {
	req.session.lastPage='/watchList'
	// console.log(req.body);
	db.watchlist.findOrCreate({where: req.body}).spread(function(data, created) {
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
      	db.watchlist.count({where:{imdbcode:list.imdbID}}).then(function(foundItemCount) {
      		var wasFound = foundItemCount > 0;
	        res.render('movies', {list: list, movieFound:wasFound, item:list})
      	})
    }
  })
})

app.get('/watchList/:id/comments', function(req, res) {
	var commentID=req.params.id;
	res.render('comments', {commentID:commentID});
})


app.post('/watchList/:id/comments', function(req, res) {
	db.watchlist.find({where: {id: req.params.id } })
	.then(function(theComment) {
		theComment.createNewcomment({comment:req.body.comment})
		.then(function(actuallyPost) {
			res.send({actuallyPost:actuallyPost})
			// console.log('he!');
		})
	})

	// db.comment.createPost()
})




app.delete('/watchList/:id', function(req, res) {
	db.watchlist.destroy({where:{ id: req.params.id}}).then(function(deleteCount) {
		res.send({deleted: deleteCount})
	})
})



app.listen(3000);
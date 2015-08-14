var express = require('express');
var uuid = require('uuid');
var users = {};

function addUser (user)
{
	var id = uuid.v1();
	user.score = 0;
	users[id] = user;
	return id;
}

var router = express.Router();

var users = [];

/* GET home page. */
router.post('/register', function(req, res){
	var data = req.body;
	var id = addUser(data);
	if(id)
		res.send(200, {"id":id, "result":"done"});
	else
		res.send(200, {"result":"error"});
});

router.post('/get_score', function(req, res){
	var id = req.body.id;
	var user = users[id];
	if (user)
		res.send(200, {"score":user.score, "result":"done"});
	else
		res.send(200, {"result":"error"});
});

router.post('/add_score', function(req, res){
	var id = req.body.id;
	var user = users[id];
	if(user)
	{
		user.score = user.score + req.body.score;
		res.send(200, {"result":"done"});
	}
	else
	{
		res.send(200, {"result":"error"});
	}
		
});

router.post('/answer', function(req, res){
	var id = req.body.id;
	var user = users[id];
	if(user)
	{

	}
	else
		res.send(200, {"result":"error"});
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

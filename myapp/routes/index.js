var express = require('express');
var users = {};


var mutex = 0;


function addUser (user)
{
	user.score = 0;
	if(!user.color)
	{
		users[user.color] = user;
		return 0;
	}
	return -1;
}

var router = express.Router();

/* GET home page. */
router.post('/register', function(req, res){
	var data = req.body;
	var rc = addUser(data);
	if(rc == 0)
		res.send(200, {"result":"done"});
	else
		res.send(200, {"result":"error"});
});

router.post('/get_score', function(req, res){
	var color = req.body.color;
	var user = users[color];
	if (user)
		res.send(200, {"score":user.score, "result":"done"});
	else
		res.send(200, {"result":"error"});
});

router.post('/set_score', function(req, res){
	var color = req.body.color;
	var user = users[color];
	if(user)
	{
		user.score = req.body.score;
		res.send(200, {"result":"done"});
	}
	else
	{
		res.send(200, {"result":"error"});
	}
		
});

router.get('/get_users', function(req, res){
	var newUsers = [];
	for(var u in users)
	{
		var user = users[u];
		newUsers.push(user);
	}
	res.send(200, {"result":"done", "users":newUsers});
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

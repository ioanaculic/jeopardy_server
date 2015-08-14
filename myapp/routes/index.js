var express = require('express');
var users = {};
console.log("in routes");

var mutex = 0;


function addUser (user)
{
	user.score = 0;
	user.color = user.color.toLowerCase();
	var color = user.color;
	if(!users[color])
	{
		users[color] = user;
		return 0;
	}
	return -1;
}

var router = express.Router();

/* GET home page. */
router.post('/register', function(req, res){
	var data = req.body;
	var rc = addUser(data);
console.log("return code = "+rc);
	if(rc == 0)
{var msg = {"result":"done"}
		res.send(200, msg);}
	else{var msg = {"result":"error"}
		res.send(200, msg);
}});

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
console.log(user);
		newUsers.push(user);
	}
console.log(newUsers);
	res.send(200, newUsers);
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function getUsers()
{
	console.log(users);
	return users;
}

module.exports = router;
exports.users = users;
exports.getUsers = getUsers;

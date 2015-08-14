var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var routes = require('./routes/index');

var PORT = 80;
var mutex = 0;
var mySocket = null;

var app = express();
var users = app.users;
app.use(cors());
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

routes.post('/answer', function(req, res){
  console.log(req.body);
  if(mySocket != null)
  {
    if (mutex == 0)
    {
      mutex = 1;
      var color = req.body.color;
      console.log(color);
      console.log(users);
      var user = users[color];
      console.log(user);
      if(user)
      {
        socket.emit('answer',{'color':user});
        res.send(200, {'result':'done'});
      }
      else
        res.send(200, {"result":"error"});
    }
    else
      res.send(200, {"result":"done"});
  }
  else
    res.send(200, {"result":"error"});
});

routes.get('/new', function(req, res){
  mutex = 0;
  res.send({"result":"done"});
});

io.on('connection', function(socket){
  console.log('a user connected');
  mySocket = socket;
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

var server = http.listen(PORT, function () {
  console.log('Example app listening at http://%s:%s', PORT);
});


module.exports = app;

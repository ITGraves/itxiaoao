var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var setting = require('./setting');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var ejs = require('ejs');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, '../myapp/build/'));
//app.set('view engine', 'html');
//app.engine('html',ejs.renderFile);

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());//cookie分析器
app.use(express.static(path.join(__dirname, 'build')));
app.use(flash());

app.use(session({
  secret: setting.CookieSecret,
  key: setting.db,
  cookie: {maxAge:1000*60*60*24},
  store: new MongoStore({
    //db:settings.db
    url:'mongodb://localhost/'+setting.db,
    
  })
}));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

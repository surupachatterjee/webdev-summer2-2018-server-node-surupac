var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
/*mongoose.connect('mongodb://localhost:27017/webdev-summer2-2018-mongodb-surupac',
    { useNewUrlParser: true });*/
mongoose.connect('mongodb://webdevstc:webdevstc2018@ds113942.mlab.com:13942/webdev-summer2-2018-mongodb-surupac',
    { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        /*"http://localhost:4200");*/
        "https://course-mgmt-angular-client-stc.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send('Hello World')
})


app.get('/message/:theMessage', function (req, res) {
    var theMessage = req.params['theMessage '];
    res.send(theMessage);
})

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);
/*
app.get('/api/session/get',
    getSessionAll);
app.get('/api/session/reset',
    resetSession);

*/

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

var userService = require('./services/user.service.server');
userService(app);

var sectionService = require('./services/section.service.server');
sectionService(app);

console.log("Server started")
/*
app.listen(3000)*/

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
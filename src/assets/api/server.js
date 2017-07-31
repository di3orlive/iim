var express = require('express');
var bodyParser = require('body-parser');
var gcal = require('google-calendar');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());

app.listen(3012);

passport.use(new GoogleStrategy({
        clientID: '432738914505-tgpg021nlq2d1gvn2sbv57l5u7o6s6rm.apps.googleusercontent.com',
        clientSecret: 'uAXqQCin5WR4dVBsOM0VXR48',
        callbackURL: "http://localhost:3012/auth/callback",
        scope: ['https://www.googleapis.com/auth/calendar']
    },
    function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        return done(null, profile);
    }
));


/*
 ===========================================================================
 Google Calendar
 ===========================================================================
 */

app.all('/', function(req, res){

    if(!req.session.access_token) return res.redirect('/auth');

    //Create an instance from accessToken
    var accessToken = req.session.access_token;

    gcal(accessToken).calendarList.list(function(err, data) {
        if(err) return res.send(500,err);
        return res.send(data);
    });
});

app.all('/:calendarId', function(req, res){

    if(!req.session.access_token) return res.redirect('/auth');

    //Create an instance from accessToken
    var accessToken     = req.session.access_token;
    var calendarId      = req.params.calendarId;

    gcal(accessToken).events.list(calendarId, {maxResults:1}, function(err, data) {
        if(err) return res.send(500,err);

        console.log(data);
        if(data.nextPageToken){
            gcal(accessToken).events.list(calendarId, {maxResults:1, pageToken:data.nextPageToken}, function(err, data) {
                console.log(data.items)
            })
        }


        return res.send(data);
    });
});










//
//
//
//
//
//
//
//
//
// var app = express();
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));
//
//
// app.post('/', function (req, res) {
//     res.send(req.body);
// });
//
//
// app.listen(3012, function () {
//     console.log('api');
// });

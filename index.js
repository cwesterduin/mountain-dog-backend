const express = require('express');
var async = require('async');
const app = express();
const server = require('http').createServer(app)
const path = require('path');
const cors = require('cors');
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 5000;
}

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "rds-mysql-10mintutorial.cx7tmt6mbnem.eu-west-2.rds.amazonaws.com",
  user: process.env.RDS_USER,
  password: process.env.RDS_PASS,
  database: "MountainDogV2"
});

app.use(cors());

app.get('/Events', (req, res) => {
	con.query('SELECT Events.*, Media.Path from Events INNER JOIN Media on Events.EventMediaID = Media.MediaID', function (error, results, fields) {
		res.send({results})
	});
});

app.get('/Events/:id', (req, res) => {
    let id = req.params.id;
    let query1 = `SELECT * from Events where EventID = ${id}`;
    let query2 = `SELECT * from Media where EventID = ${id}`;
    let query3 = `SELECT MapFeatures.*, Media.Path FROM EventMapFeatures
    INNER JOIN MapFeatures
    ON EventMapFeatures.MapFeatureID = MapFeatures.MapFeatureID
    INNER JOIN Media
    ON MapFeatures.MediaID = Media.MediaID
    WHERE EventMapFeatures.EventID = ${id}`;
    let return_data = {};
    async.parallel([
       function(parallel_done) {
           con.query(query1, {}, function(err, results) {
               return_data.Event = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           con.query(query2, {}, function(err, results) {
               return_data.Media = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           con.query(query3, {}, function(err, results) {
               return_data.MapFeatures = results;
               parallel_done();
           });
       }
    ], function(err) {
         res.send(return_data);
    });
});


app.get('/Media', (req, res) => {
	con.query('SELECT * from Media', function (error, results, fields) {
		res.send({results})
	});
});

app.get('/MediaDate', (req, res) => {
	con.query('SELECT Media.*, Events.Date, Events.EventID from Media INNER JOIN Events on Media.EventID = Events.EventID', function (error, results, fields) {
		res.send({results})
	});
});

app.get('/mapFeatures', (req, res) => {
	con.query('SELECT MapFeatures.*, Media.Path, Media.Description FROM MapFeatures INNER JOIN Media ON MapFeatures.MediaID = Media.MediaID', function (error, results, fields) {
		res.send({results})
	});
});

app.get('/EventMapFeatures', (req, res) => {
	con.query('SELECT MapFeatures.*, EventMapFeatures.EventID, Events.Date, Events.Name as EventName, Trips.Name as TripName, Events.TripID FROM EventMapFeatures INNER JOIN MapFeatures ON MapFeatures.MapFeatureID = EventMapFeatures.MapFeatureID INNER JOIN Events on EventMapFeatures.EventID = Events.EventID LEFT JOIN Trips on Trips.TripID = Events.TripID',
  function (error, results, fields) {
		res.send({results})
	});
});

app.get('/Trips', (req, res) => {
	con.query('SELECT Trips.*, Events.Date, Events.Name as EventName, Media.Path FROM Trips INNER JOIN Media on Trips.TripMediaID = Media.MediaID INNER JOIN Events on Events.TripID = Trips.TripID', function (error, results, fields) {
		res.send({results})
	});
});

app.get('/Trips/:id', (req, res) => {
    let id = req.params.id;
    let query1 = `SELECT Events.*, Trips.Name as TripName from Events
        INNER JOIN Trips
        ON Events.TripID = Trips.TripID
        where Events.TripID = ${id}`;
    let query2 = `SELECT MapFeatures.Name, MapFeatures.Lng, MapFeatures.Lat, MapFeatures.Type, EventMapFeatures.EventID as EventID, Events.Name as EventName, Events.Date as Date, Events.TripID FROM Events
        INNER JOIN EventMapFeatures
        ON EventMapFeatures.EventID = Events.EventID
        INNER JOIN MapFeatures
        ON EventMapFeatures.MapFeatureID = MapFeatures.MapFeatureID
        WHERE Events.TripID = ${id}`;
    let return_data = {};
    async.parallel([
       function(parallel_done) {
           con.query(query1, {}, function(err, results) {
               return_data.Event = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           con.query(query2, {}, function(err, results) {
               return_data.MapFeatures = results;
               parallel_done();
           });
       },
    ], function(err) {
         res.send(return_data);
    });
});

server.listen(PORT, () => {
  console.log('listening on *:5000');
});

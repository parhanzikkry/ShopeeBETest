var express = require('express');
var router = express.Router();
var TrackController = require(__dirname + '/../controllers/Track.controller');

router.get('/ListOfTracks', function(req, res, next) {
    TrackController.GetAllTracks(req, res);
});

router.post('/NewTrack', (req, res, next) => {
    TrackController.AddTrack(req, res);
});

router.delete('/DeleteTrack/:id', (req, res, next) => {
    TrackController.DeleteOneTrack(req, res);
});

module.exports = router;
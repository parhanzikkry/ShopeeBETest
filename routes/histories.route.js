var express = require('express');
var router = express.Router();
var HistoryController = require(__dirname + '/../controllers/Histories.controller');

router.post('/CreateHistory', function(req, res, next) {
    HistoryController.CreateHistory(req, res);
});

router.get('/Get7DayOfHistoriesByDate/:date', (req, res, next) => {
    HistoryController.GetSevenDaysOfHistoriesByDate(req, res);
});

router.get('/Get7DayOfHistoriesByTracked/:from/:to', (req, res, next) => {
    HistoryController.GetSevenDaysOfHistoriesByTrack(req, res);
});

module.exports = router;
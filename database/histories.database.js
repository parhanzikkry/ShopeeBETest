var sequelize = require('../dbconnection'),
    Histories = sequelize.import(__dirname + '/../models/Histories.model');

Histories
    .bulkCreate([{
        history_date: "2018-07-01",
        history_rate: 1.365,
        fk_track_id: 1
    }, {
        history_date: "2018-07-02",
        history_rate: 1.288,
        fk_track_id: 1
    }, {
        history_date: "2018-07-03",
        history_rate: 1.333,
        fk_track_id: 1
    }, {
        history_date: "2018-07-04",
        history_rate: 1.187,
        fk_track_id: 1
    }, {
        history_date: "2018-07-05",
        history_rate: 1.255,
        fk_track_id: 1
    }, {
        history_date: "2018-07-06",
        history_rate: 1.275,
        fk_track_id: 1
    }, {
        history_date: "2018-07-07",
        history_rate: 1.265,
        fk_track_id: 1
    }, {
        history_date: "2018-07-01",
        history_rate: 0.760123,
        fk_track_id: 2
    }, {
        history_date: "2018-07-02",
        history_rate: 0.7623,
        fk_track_id: 2
    }, {
        history_date: "2018-07-03",
        history_rate: 0.7523,
        fk_track_id: 2
    }, {
        history_date: "2018-07-04",
        history_rate: 0.7723,
        fk_track_id: 2
    }, {
        history_date: "2018-07-05",
        history_rate: 0.7623,
        fk_track_id: 2
    }, {
        history_date: "2018-07-06",
        history_rate: 0.7613,
        fk_track_id: 2
    }, {
        history_date: "2018-07-07",
        history_rate: 0.7701,
        fk_track_id: 2
    }, {
        history_date: "2018-07-01",
        history_rate: 14123,
        fk_track_id: 3
    }, {
        history_date: "2018-07-02",
        history_rate: 15123,
        fk_track_id: 3
    }, {
        history_date: "2018-07-03",
        history_rate: 14753,
        fk_track_id: 3
    }, {
        history_date: "2018-07-04",
        history_rate: 14873,
        fk_track_id: 3
    }, {
        history_date: "2018-07-05",
        history_rate: 14553,
        fk_track_id: 3
    }, {
        history_date: "2018-07-07",
        history_rate: 0.7701,
        fk_track_id: 3
    }])
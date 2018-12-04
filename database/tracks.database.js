var sequelize = require('../dbconnection'),
    Tracks = sequelize.import(__dirname + '/../models/Tracks.model');

Tracks
    .bulkCreate([{
        from: "GBP",
        to: "USD"
    }, {
        from: "USD",
        to: "GBP"
    }, {
        from: "USD",
        to: "IDR"
    }, {
        from: "JPY",
        to: "IDR"
    }])
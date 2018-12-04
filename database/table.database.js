var sequelize = require('../dbconnection'),
    Tracks = sequelize.import(__dirname + '/../models/Tracks.model'),
    Histories = sequelize.import(__dirname + '/../models/Histories.model');


Tracks
    .sync()
    .then(() => {
        Histories
            .sync();
    });
var sequelize = require('../dbconnection'),
    Tracks = sequelize.import(__dirname + '/Tracks.model');
    
module.exports = function(sequelize, DataType) {
	return sequelize.define('histories', {
		history_date: {
			type: DataType.DATEONLY,
			validate: {
				isDate: true,
				notEmpty: true,
			}
		},
		history_rate: {
			type: DataType.FLOAT,
			validate: {
				isDecimal: true,
				notEmpty: true,
			}
		},
		fk_track_id: {
			type: DataType.INTEGER,
			references: {
				model: Tracks,
				key: 'id'
			}
		},
	});
}
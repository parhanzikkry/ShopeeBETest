module.exports = (sequelize, DataType) => {
	return sequelize.define('tracks', {
		from: {
			type: DataType.STRING(3),
			validate: {
				isUppercase: true,
				notEmpty: true,
				len: [3,3],
			}
		},
        to: {
			type: DataType.STRING(3),
			validate: {
				isUppercase: true,
				notEmpty: true,
				len: [3,3],
			}
		}
	});
}
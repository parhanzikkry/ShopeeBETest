var Sequelize = require('sequelize');

module.exports = new Sequelize('currencyexchanges'/*DB name*/, 'pzp'/*DB username*/, 'ayulestari'/*DB password*/, {
	host: process.env.DATABASE_HOST || '127.0.0.1',
    dialect: 'mysql'/*type of DBMS*/,
    port: 3306,

	pool: {
		/*Set max requesting to database*/
		max: 100,
		min: 0,
		idle: 30000,
		acquire: 10000
	},
	/*Set timezone to DB*/
	timezone: '+07:00'
});
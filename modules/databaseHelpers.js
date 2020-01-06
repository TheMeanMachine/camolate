"use strict";
/**
 * Takes array of SQL queries and queries the db
 * @author A.M.
 * @param  {Array} array - A list of SQL queries
 * @param {mySQL connection} connection - MySQL connection object
 * @return {message}
 */
exports.arrayOfQueries = async (array, connection) => {

	for(let i = 0; i < array.length; i++){
		await connection.query(array[i]);
	}

	return {message:"queried successfully"};
};
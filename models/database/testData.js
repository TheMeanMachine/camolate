"use strict";
const helpers = require("../../modules/databaseHelpers"); 
const mysql = require("promise-mysql");

const prepareData = () => {
	//Mocked data
	const data = {
		user:[
			{},
			{},
			{},
			{}
		],
		level:[
			{
				name: "'Fantastic'",
				allowance: 25
			},
			{
				name: "'Good'",
				allowance: 50
			},
			{
				name: "'Fair'",
				allowance: 100
			},
			{
				name: "'Bad'",
				allowance: 150
			},
			{
				name: "'Terrible'",
				allowance: 200
			}
		],
		category:[
			{
				name: "'Fresh Fruit'",
				published: 1,
				authorID: 2,
				levelID: 1//fantastic
			},
			{
				name: "'Dried Fruit'",
				published: 1,
				authorID: 2,
				levelID: 4//bad
			},
			{
				name: "'Nuts'",
				published: 1,
				authorID: 2,
				levelID: 1//fantastic
			},
			{
				name: "'Chocolate'",
				published: 1,
				authorID: 3,
				levelID: 5//terrible
			},
			{
				name: "'Energy bar'",
				published: 0,
				authorID: 2,
				levelID: 5//terrible
			},
			{
				name: "'Hard candy'",
				published: 0,
				authorID: 2,
				levelID: 4//bad
			},
			{
				name: "'Berries'",
				published: 0,
				authorID: 2,
				levelID: 1//fantastic
			},
			{
				name: "'Crisps'",
				published: 1,
				authorID: 2,
				levelID: 1
			},
			{
				name: "'Biscuits'",
				published: 0,
				authorID: 3,
				levelID: 4//Bad
			},
			{
				name: "'Pastry'",
				published: 1,
				authorID: 2,
				levelID: 5//Terrible
			}
		],
		snack:[
			{
				name: "'Apple'",
				categoryID: 1,
				authorID: 1,
				published: 1
			},
			{
				name: "'Banana'",
				categoryID: 1,
				authorID: 2,
				published: 0
			},
			{
				name: "'Creme Egg'",
				categoryID: 4,
				authorID: 3,
				published: 1
			},
			{
				name: "'Elcair'",
				categoryID: 10,
				authorID: 1,
				published: 1
			},
			{
				name: "'Salt and vinegar crisps'",
				categoryID: 8,
				authorID: 1,
				published: 0
			}
		],
		goal: [
			{
				name: "'Doing alright'",
				authorID: 1,
				published: 1
			},
			{
				name: "'I like to snack, okay?'",
				authorID: 2,
				published: 0
			},
			{
				name: "'Healthy life'",
				authorID: 3,
				published: 1
			}
		],
		goal_level: [
			{//goal 1
				goalID: 1,
				levelID: 1,
				amountAllowed: 2
			},
			{
				goalID: 1,
				levelID: 2,
				amountAllowed: 1
			},
			{
				goalID: 1,
				levelID: 3,
				amountAllowed: 0
			},
			{
				goalID: 1,
				levelID: 4,
				amountAllowed: 0
			},
			{
				goalID: 1,
				levelID: 5,
				amountAllowed: 0
			},
			{//goal 2
				goalID: 2,
				levelID: 1,
				amountAllowed: 0
			},
			{
				goalID: 2,
				levelID: 2,
				amountAllowed: 1
			},
			{
				goalID: 2,
				levelID: 3,
				amountAllowed: 1
			},
			{
				goalID: 2,
				levelID: 4,
				amountAllowed: 0
			},
			{
				goalID: 2,
				levelID: 5,
				amountAllowed: 3
			},
			{//goal 3
				goalID: 3,
				levelID: 1,
				amountAllowed: 1
			},
			{
				goalID: 3,
				levelID: 2,
				amountAllowed: 0
			},
			{
				goalID: 3,
				levelID: 3,
				amountAllowed: 1
			},
			{
				goalID: 3,
				levelID: 4,
				amountAllowed: 0
			},
			{
				goalID: 3,
				levelID: 5,
				amountAllowed: 1
			}
		],
		entry: [
			{
				goalID: 1,
				userID: 1,
				date: "'2008-11-11 13:23:44'"
			},
			{
				goalID: 2,
				userID: 2,
				date: "'2018-11-09 10:23:20'"
			},
			{
				goalID: 3,
				userID: 3,
				date: "'2020-01-01 10:23:20'"
			}
		],
		snack_entry: [
			{
				entryID: 1,
				categoryID: 1,
				amount: 2
			},
			{
				entryID: 1,
				snackID: 2,
				amount: 1
			},
			{
				entryID: 2,
				categoryID: 4,
				amount: 1
			},
			{
				entryID: 2,
				categoryID: 2,
				amount: 3
			},
			{
				entryID: 2,
				categoryID: 2,
				amount: 1
			}
		],
		list_user_category:[],
		list_user_goal:[],
		list_user_snack:[]
	};

	this.associateAuthorsTo(data.category, data.list_user_category, "categoryID");
	this.associateAuthorsTo(data.goal, data.list_user_goal, "goalID");
	this.associateAuthorsTo(data.snack, data.list_user_snack, "snackID");


	return data;
};

/**
 * Associates authors to their publication - if published, there will be no association
 * database ID is taken as the index of the element + 1
 * @param  {array} listToCheck array of object with attributes author & published
 * @param  {array} listToAddTo array to list the associations
 */
exports.associateAuthorsTo = (listToCheck, listToAddTo, nameOfID) => {
    
	for(let i = 0; i < listToCheck.length; i++){
		const obj = listToCheck[i];
		if(obj.published === 1) continue;//if published, don't associate
		const itemToAdd = {
			userID: obj.authorID
		};
		itemToAdd[nameOfID] = i + 1;
		listToAddTo.push(itemToAdd);
	}
	return {message: "Operation was successfully completed"};
    
};

/**
 * Searches array of objects for attribute 'name'
 * @param  {array} array_of_obj Array of objects with name attributes
 * @param  {string} name of object to find
 * @return {int} index of obj in array, -1 if not found
 */
exports.indexObjInArray_byName = (array_of_obj, name) => {
	for(let i = 0; i < array_of_obj.size(); i++){
		if(array_of_obj[0].name === name) return i;
	}
	return -1;
};



exports.mockData = async () => {
	const data = prepareData();

	const config = require("../../config");
	const connection = await mysql.createConnection(config.database);

	for(let table of Object.keys(data) ){
		await insertData(connection, table, data[table]);
	}
    
	connection.end();//Close the connection

	return;
};

const getColumns = (obj) => {
	const columns = [];

	for(let colKey of Object.keys(obj)) columns.push(colKey);

	return columns;
};

const insertData = async (connection, table_name, data) => {
	const columns = getColumns(data[0]);
	for(let dataSet of data){
		const sql = `
            INSERT INTO ${table_name}
            (${columns.toString()})
            VALUES (${Object.values(dataSet)});
        `;
		await connection.query(sql);
	}
    
	return;
};


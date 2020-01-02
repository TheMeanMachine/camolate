var mysql = require("promise-mysql");
var info = require("../../config");

exports.adminConsole = async() => {
    
};

/**
 * Creates database and tables
 * @author A.M
 */
exports.createTables = async() => {
	try{
		const connectionNoDB = await mysql.createConnection({host: info.database.host, user: info.database.user, password: info.database.password});
		const databaseSql = "CREATE DATABASE IF NOT EXISTS `"+ info.database.database + "`";

		await connectionNoDB.query(databaseSql);

		const connection = await mysql.createConnection(info.config);

		const sql =
        {
        	tables: {
        		user:[`  
                    CREATE TABLE IF NOT EXISTS user (
                        ID int NOT NULL PRIMARY KEY
                        );
                    `
        		],
        		goal:[`
                    CREATE TABLE IF NOT EXISTS goal(
                        ID int NOT NULL PRIMARY KEY,
                        authorID int,
                        name text,
                        published int(1)
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS list_user_goal(
                        ID int NOT NULL PRIMARY KEY,
                        userID int,
                        goalID int
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS goal_level(
                        ID int NOT NULL PRIMARY KEY,
                        goalID int,
                        levelID int,
                        amountAllowed int
                        );
                    `
        		],
        		entry:[`
                    CREATE TABLE IF NOT EXISTS entry(
                        ID int NOT NULL PRIMARY KEY,
                        goalID int NOT NULL,
                        userID int NOT NULL
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS snack_entry(
                        ID int NOT NULL PRIMARY KEY,
                        entryID int NOT NULL,
                        snackID int,
                        categoryID int,
                        amount int
                        );
                    `
        		],
        		snack:[`
                    CREATE TABLE IF NOT EXISTS list_user_snack(
                        ID int NOT NULL PRIMARY KEY,
                        userID int NOT NULL,
                        snackID int NOT NULL
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS snack(
                        ID int NOT NULL PRIMARY KEY,
                        authorID int NOT NULL,
                        categoryID int NOT NULL,
                        name text,
                        published int(2)
                        );
                    `
        		],
        		category:[`
                    CREATE TABLE IF NOT EXISTS category(
                        ID int NOT NULL PRIMARY KEY,
                        authorID int NOT NULL,
                        levelID int NOT NULL,
                        name text,
                        published int(2)
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS list_user_category(
                        ID int NOT NULL PRIMARY KEY,
                        userID int NOT NULL,
                        categoryID int NOT NULL
                        );
                    `
        		],
        		level:[`
                    CREATE TABLE IF NOT EXISTS level(
                        ID int NOT NULL PRIMARY KEY,
                        name text NOT NULL,
                        allowance int NOT NULL
                        );
                    `
        		]
        	},
        	constraints:{
        		user:[`
                `
        		],
        		goal:[`
                    ALTER TABLE goal
                    ADD CONSTRAINT goal-FK-authorID
                        FOREGIN KEY (authorID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE list_user_goal
                    ADD CONSTRAINT list_user_goal-FK-userID
                        FOREGIN KEY (userID) REFERENCES user(ID),
                    CONSTRAINT list_user_goal-FK-goalID
                        FOREGIN KEY (goalID) REFERENCES goal(ID);
                    `,`
                    ALTER TABLE goal_level
                    ADD CONSTRAINT goal_level-FK-levelID
                        FOREGIN KEY (levelID) REFERENCES level(ID),
                    CONSTRAINT goal_level-FK-goalID
                        FOREGIN KEY (goalID) REFERENCES goal(ID);
                    `
        		],
        		entry:[`
                    ALTER TABLE snack_entry
                    ADD CONSTRAINT snack_entry-FK-entryID
                        FOREIGN KEY (entryID) REFERENCES entry(ID),
                    CONSTRAINT snack_entry-FK-snackID
                        FOREIGN KEY (snackID) REFERENCES snack(ID),
                    CONSTRAINT snack_entry-FK-categoryID
                        FOREIGN KEY (categoryID) REFERENCES category(ID),
                    CONSTRAINT snack_entry-ONLYONE-categoryID-snackID
                        CHECK (
                            ( cast(snackID is not null, int) +
                            cast(categoryID is not null, int) ) = 1
                        );
                    `,`
                    ALTER TABLE entry
                    ADD CONSTRAINT entry-FK-userID
                        FOREGIN KEY (userID) REFERENCES user(ID),
                    CONSTRAINT entry-FK-goalID
                        FOREGIN KEY (goalID) REFERENCES goal(ID)
                    `
        		],
        		snack:[`
                    ALTER TABLE snack
                    ADD CONSTRAINT snack-FK-authorID
                        FOREGIN KEY (authorID) REFERENCES user(ID),
                    CONSTRAINT snack-FK-categoryID
                        FOREGIN KEY (categoryID) REFERENCES category(ID);
                    `,`
                    ALTER TABLE list_user_snack
                    ADD CONSTRAINT list_user_snack-FK-userID
                        FOREGIN KEY (userID) REFERENCES user(ID),
                    CONSTRAINT list_user_snack-FK-snackID
                        FOREGIN KEY (snackID) REFERENCES snack(ID);
                    `
        		],
        		category:[`
                    ALTER TABLE category
                    ADD CONSTRAINT category-FK-authorID
                        FOREGIN KEY (authorID) REFERENCES user(ID),
                    CONSTRAINT category-FK-levelID
                        FOREGIN KEY (levelID) REFERENCES level(ID);
                    `,`
                    ALTER TABLE list_user_category
                    ADD CONSTRAINT list_user_category-FK-userID
                        FOREGIN KEY (userID) REFERENCES user(ID),
                    CONSTRAINT list_user_category-FK-categoryID
                        FOREGIN KEY (categoryID) REFERENCES category(ID);
                    `
        		],
        		level:[`
                `]

        	}

        };
		//Run tables queries
		for(const key of Object.keys(sql.tables)) await arrayOfQueries(sql.tables.key, connection);
        
		//Run constraint queries
		for(const key of Object.keys(sql.constraints)) await arrayOfQueries(sql.constraints.key, connection);

		return {message:"created successfully"};

	}catch (error){
		throw error;
	}
};

/**
 * Takes array of SQL queries and queries the db
 * @author A.M.
 * @param  {Array} array - A list of SQL queries
 * @param {mySQL connection} connection - MySQL connection object
 * @return {void}
 */
const arrayOfQueries = async (array, connection) => {
	try {
		for(let i = 0; i < array.length; i++){
			await connection.query(array[i]);
		}
	}catch (error) {
		throw error;
	}

};
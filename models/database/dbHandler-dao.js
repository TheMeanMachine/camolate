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

		const connection = await mysql.createConnection(info.database);

		const sql =
        {
        	tables: {
        		user:[`  
                    CREATE TABLE IF NOT EXISTS user (
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT AUTO_INCREMENT
                        );
                    `
        		],
        		goal:[`
                    CREATE TABLE IF NOT EXISTS goal(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT AUTO_INCREMENT,
                        authorID int,
                        name text,
                        published int(1)
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS list_user_goal(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT AUTO_INCREMENT,
                        userID int,
                        goalID int
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS goal_level(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT AUTO_INCREMENT,
                        goalID int,
                        levelID int,
                        amountAllowed int
                        );
                    `
        		],
        		entry:[`
                    CREATE TABLE IF NOT EXISTS entry(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT AUTO_INCREMENT,
                        goalID int NOT NULL,
                        userID int NOT NULL
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS snack_entry(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        entryID int NOT NULL,
                        snackID int,
                        categoryID int,
                        amount int
                        );
                    `
        		],
        		snack:[`
                    CREATE TABLE IF NOT EXISTS list_user_snack(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        userID int NOT NULL,
                        snackID int NOT NULL
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS snack(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        authorID int NOT NULL,
                        categoryID int NOT NULL,
                        name text,
                        published int(2)
                        );
                    `
        		],
        		category:[`
                    CREATE TABLE IF NOT EXISTS category(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        authorID int NOT NULL,
                        levelID int NOT NULL,
                        name text,
                        published int(2)
                        );
                    `,`
                    CREATE TABLE IF NOT EXISTS list_user_category(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        userID int NOT NULL,
                        categoryID int NOT NULL
                        );
                    `
        		],
        		level:[`
                    CREATE TABLE IF NOT EXISTS level(
                        ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        name text NOT NULL,
                        allowance int NOT NULL
                        );
                    `
        		]
        	},
        	constraints:{//todo figure out why multiline constraints are not applying
        		goal:[`
                    ALTER TABLE goal
                    ADD CONSTRAINT goal_FK_authorID
                        FOREIGN KEY (authorID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE list_user_goal
                    ADD CONSTRAINT list_user_goal_FK_userID
                        FOREIGN KEY (userID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE list_user_goal
                    ADD CONSTRAINT list_user_goal_FK_goalID
                        FOREIGN KEY (goalID) REFERENCES goal(ID);
                    `,`
                    ALTER TABLE goal_level
                    ADD CONSTRAINT goal_level_FK_levelID
                        FOREIGN KEY (levelID) REFERENCES level(ID);
                    `,`
                    ALTER TABLE goal_level
                    ADD CONSTRAINT goal_level_FK_goalID
                        FOREIGN KEY (goalID) REFERENCES goal(ID);
                    `
        		],
        		entry:[`
                    ALTER TABLE snack_entry
                    ADD CONSTRAINT snack_entry_FK_entryID
                        FOREIGN KEY (entryID) REFERENCES entry(ID)
                    `,`
                    ALTER TABLE snack_entry
                    ADD CONSTRAINT snack_entry_FK_snackID
                        FOREIGN KEY (snackID) REFERENCES snack(ID)
                    `,`
                    ALTER TABLE snack_entry
                    ADD CONSTRAINT snack_entry_FK_categoryID
                        FOREIGN KEY (categoryID) REFERENCES category(ID);
                    `,`
                    ALTER TABLE snack_entry
                    ADD CONSTRAINT snack_entry_ONLYONE_categoryID_snackID
                        CHECK(
                            (snackID IS NULL AND categoryID IS NOT NULL)
                            XOR
                            (snackID IS NOT NULL AND categoryID IS NULL)
                        );
                    `,`
                    ALTER TABLE entry
                    ADD CONSTRAINT entry_FK_userID
                        FOREIGN KEY (userID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE entry
                    ADD CONSTRAINT entry_FK_goalID
                        FOREIGN KEY (goalID) REFERENCES goal(ID)
                    `
        		],
        		snack:[`
                    ALTER TABLE snack
                    ADD CONSTRAINT snack_FK_authorID
                        FOREIGN KEY (authorID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE snack
                    ADD CONSTRAINT snack_FK_categoryID
                        FOREIGN KEY (categoryID) REFERENCES category(ID);
                    `,`
                    ALTER TABLE list_user_snack
                    ADD CONSTRAINT list_user_snack_FK_userID
                        FOREIGN KEY (userID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE list_user_snack
                    ADD CONSTRAINT list_user_snack_FK_snackID
                        FOREIGN KEY (snackID) REFERENCES snack(ID);
                    `
        		],
        		category:[`
                    ALTER TABLE category
                    ADD CONSTRAINT category_FK_authorID
                        FOREIGN KEY (authorID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE category
                    ADD CONSTRAINT category_FK_levelID
                        FOREIGN KEY (levelID) REFERENCES level(ID);
                    `,`
                    ALTER TABLE list_user_category
                    ADD CONSTRAINT list_user_category_FK_userID
                        FOREIGN KEY (userID) REFERENCES user(ID);
                    `,`
                    ALTER TABLE list_user_category
                    ADD CONSTRAINT list_user_category_FK_categoryID
                        FOREIGN KEY (categoryID) REFERENCES category(ID);
                    `
        		]
        	}

        };
		//Run tables queries
		for(let key of Object.keys(sql.tables)) await arrayOfQueries(sql.tables[key], connection);
        
		//Run constraint queries
		for(let key of Object.keys(sql.constraints)) await arrayOfQueries(sql.constraints[key], connection);

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
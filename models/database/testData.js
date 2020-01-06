
//Mocked data
const data = {
    user_AMOUNT: 4,
    level:[
        {
            name: "Fantastic",
            allowance: 25
        },
        {
            name: "Good",
            allowance: 50
        },
        {
            name: "Fair",
            allowance: 100
        },
        {
            name: "Bad",
            allowance: 150
        },
        {
            name: "Terrible",
            allowance: 200
        }
    ],
    category:[
        {
            name: "Fresh Fruit",
            published: 1,
            authorID: 2,
            levelID: 1//fantastic
        },
        {
            name: "Dried Fruit",
            published: 1,
            authorID: 2,
            levelID: 4//bad
        },
        {
            name: "Nuts",
            published: 1,
            authorID: 2,
            levelID: 1//fantastic
        },
        {
            name: "Chocolate",
            published: 1,
            authorID: 3,
            levelID: 5//terrible
        },
        {
            name: "Energy bar",
            published: 0,
            authorID: 2,
            levelID: 5//terrible
        },
        {
            name: "Hard candy",
            published: 0,
            authorID: 2,
            levelID: 4//bad
        },
        {
            name: "Berries",
            published: 0,
            authorID: 2,
            levelID: 1//fantastic
        },
        {
            name: "Crisps",
            published: 1,
            authorID: 2,
            levelID: 1
        },
        {
            name: "Biscuits",
            published: 0,
            authorID: 3,
            levelID: 4//Bad
        },
        {
            name: "Pastry",
            published: 1,
            authorID: 2,
            levelID: 5//Terrible
        }
    ],
    snack:[
        {
            name: "Apple",
            categoryID: 1,
            authorID: 1,
            published: 1
        },
        {
            name: "Banana",
            categoryID: 1,
            authorID: 2,
            published: 0
        },
        {
            name: "Creme Egg",
            categoryID: 4,
            authorID: 3,
            published: 1
        },
        {
            name: "Elcair",
            categoryID: 10,
            authorID: 1,
            published: 1
        },
        {
            name: "Salt and vinegar crisps",
            categoryID: 8,
            authorID: 1,
            published: 0
        }
    ],
    goal: [
        {
            name: "Doing alright",
            authorID: 1,
            published: 1
        },
        {
            name: "I like to snack, okay?",
            authorID: 2,
            published: 0
        },
        {
            name: "Healthy life",
            authorID: 3,
            published: 1
        }
    ],
    goal_level: [
        {//goal 1
            goalID: 1,
            levelID: 1,
            amount: 2
        },
        {
            goalID: 1,
            levelID: 2,
            amount: 1
        },
        {
            goalID: 1,
            levelID: 3,
            amount: 0
        },
        {
            goalID: 1,
            levelID: 4,
            amount: 0
        },
        {
            goalID: 1,
            levelID: 5,
            amount: 0
        },
        {//goal 2
            goalID: 2,
            levelID: 1,
            amount: 0
        },
        {
            goalID: 2,
            levelID: 2,
            amount: 1
        },
        {
            goalID: 2,
            levelID: 3,
            amount: 1
        },
        {
            goalID: 2,
            levelID: 4,
            amount: 0
        },
        {
            goalID: 2,
            levelID: 5,
            amount: 3
        },
        {//goal 3
            goalID: 3,
            levelID: 1,
            amount: 1
        },
        {
            goalID: 3,
            levelID: 2,
            amount: 0
        },
        {
            goalID: 3,
            levelID: 3,
            amount: 1
        },
        {
            goalID: 3,
            levelID: 4,
            amount: 0
        },
        {
            goalID: 3,
            levelID: 5,
            amount: 1
        }
    ],
    entry: [
        {
            goalID: 1,
            userID: 1,
            date: ""
        }
    ]
};



/**
 * Associates authors to their publication - if published, there will be no association
 * database ID is taken as the index of the element + 1
 * @param  {array} listToCheck array of object with attributes author & published
 * @param  {array} listToAddTo array to list the associations
 */
exports.associateAuthorsTo = async (listToCheck, listToAddTo, nameOfID) => {
    try{
        for(let i = 0; i < listToCheck.length; i++){
            const obj = listToCheck[i];
            if(obj.published === 1) continue;//if published, don't associate
            const name = Object.keys({listToAddTo})[0];
            const itemToAdd = {
                userID: obj.authorID
            };
            itemToAdd[nameOfID] = i + 1;
            listToAddTo.push(itemToAdd);
        }
        return {message: "Operation was successfully completed"};
    }catch(err){
        throw err;
    }
    
}

/**
 * Searches array of objects for attribute 'name'
 * @param  {array} array_of_obj Array of objects with name attributes
 * @param  {string} name of object to find
 * @return {int} index of obj in array, -1 if not found
 */
exports.indexObjInArray_byName = (array_of_obj, name) => {
    for(let i = 0; i < array_of_obj.size(); i++){
        if(array_of_obj[0].name === name) return i
    }
    return -1;
}

exports.mockData = async () => {
    return;
}
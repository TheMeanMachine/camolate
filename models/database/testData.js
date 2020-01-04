
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
    list_user_category:[
    ],
    snacks:[
        {
            name: "Apple",
            //categoryID: indexObjInArray_byName(this.category, "Fresh Fruit")
        }
    ],
    associateAuthors : () => {
        associateAuthorsTo(this.categories, this.list_user_category);
    }
}



/**
 * Associates authors to their publication - if published, there will be no association
 * database ID is taken as the index of the element + 1
 * @param  {array} listToCheck array of object with attributes author & published
 * @param  {array} listToAddTo array to list the associations
 */
exports.associateAuthorsTo = (listToCheck, listToAddTo, nameOfID) => {
    for(let i = 0; i < listToCheck.length; i++){
        const obj = listToCheck[i];
        if(obj.published === 1) return;//if published, don't associate
        const name = Object.keys({listToAddTo})[0];
        const itemToAdd = {
            userID: obj.authorID
        }
        itemToAdd[nameOfID] = i + 1;
        listToAddTo.push(itemToAdd);
    }
}

/**
 * Searches array of objects for attribute 'name'
 * @param  {array} array_of_obj Array of objects with name attributes
 * @param  {string} name of object to find
 * @return {int} index of obj in array, -1 if not found
 */
const indexObjInArray_byName = (array_of_obj, name) => {
    for(let i = 0; i < array_of_obj.size(); i++){
        if(array_of_obj[0].name === name) return i
    }
    return -1;
}

exports.mockData = async () => {

}
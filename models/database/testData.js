
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
        {
            categoryID: 
            userID: this.category[this.indexObjInArray_byName(this").]
        }
    ]
    snacks:[
        {
            name: "Apple",
            categoryID: this.indexObjInArray_byName(this.category, "Fresh Fruit")
        }
    ],

    associateAuthors = () => {
        for(let i = 0; i < this.category.size(); i++){
            const category = this.category[i];
            if(category.published === 1) return;
            this.list_user_category.push({
                categoryID:  i + 1,
                userID: category.authorID
            });
        }
    },
    /**
     * Searches array of objects for attribute 'name'
     * @param  {array} array_of_obj Array of objects with name attributes
     * @param  {string} name of object to find
     * @return {int} index of obj in array, -1 if not found
     */
    indexObjInArray_byName = (array_of_obj, name) => {
        for(let i = 0; i < array_of_obj.size(); i++) (array_of_obj[0].name === name) ? return i : null;
        return -1;
    },
}

exports.mockData = await () => {

}
const testModel = require('../../../../models/database/testData');
const testDB = require('../../../../tests/prepareTestDB');

beforeEach(async done => {
	testDB.prepareTestDB();
	done();
});

afterEach(() => {
	testDB.clear();
});

describe('associateAuthorsTo', async () => {
	test('Valid inputs, no published elements', async done => {
		const test = await new testModel();
		const category = [
			{
	            name: "Dried Fruit",
	            published: 0,
	            authorID: 2,
	            levelID: 4//bad
	        },
	        {
	            name: "Nuts",
	            published: 0,
	            authorID: 2,
	            levelID: 1//fantastic
	        },
	        {
	            name: "Chocolate",
	            published: 0,
	            authorID: 3,
	            levelID: 5//terrible
	        },
		]
		const listToAddTo = []
		test.data.associateAuthorsTo(category, listToAddTo);

		expect(listToAddTo).toEqual([
			{
				categoryID: 1,
				userID: 2
			},
			{
				categoryID: 2,
				userID: 2
			},
			{
				categoryID: 3,
				userID: 3
			}
		]);

		done();
	})

})
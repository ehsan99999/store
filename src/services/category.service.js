class CategoryService {
    constructor() {
        this.serverURL = "http://localhost:3001/?";

    }
    async getAll() {
        try {
            const url = this.serverURL + "action=fetchListOfCategories" 
            let categories = await fetch(url);
            categories = categories.json();
            return categories;
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports.CategoryService = new CategoryService();
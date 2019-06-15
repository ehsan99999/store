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

const _CategoryService = new CategoryService();
export { _CategoryService as CategoryService };
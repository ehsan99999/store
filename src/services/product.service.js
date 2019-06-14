class ProductService {
    constructor() {
        this.serverURL = "http://localhost:3001/?";

    }
    async getById(productId) {
        try {
            const url = this.serverURL + "action=fetchProductById&productId=" + productId
            let product = await fetch(url);
            product = product.json();
            return product;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async getByCategoryId(categoryId,loadedProductsOffset,searchKey,sortBy) {
        try {
            const url = `${this.serverURL}action=fetchProductsByCategoryId&categoryId=${categoryId}&loadedProductsOffset=${loadedProductsOffset}&searchKey=${searchKey}&sortBy=${sortBy}`

            let products = await fetch(url);
            products = products.json();
            return products;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async getRelateProductsByProductId(productId) {
        try {
            const url = `${this.serverURL}action=fetchRelatedItemsByProductId&productId=${productId}`
            let products = await fetch(url);
            products = products.json();
            return products;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports.ProductService = new ProductService();
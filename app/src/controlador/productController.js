class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        return this.products.find(product => product.id === id);
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Todos los campos son obligatorios");
        }

        if (this.products.some(existingProduct => existingProduct.code === code)) {
            return console.log("El código de producto ya existe");
        }

        if (this.products.length > 0) {
            const lastProduct = this.products[this.products.length - 1];
            product.id = lastProduct.id + 1;
        } else {
            product.id = 1;
        }

        this.products.push(product);
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

module.exports = { ProductManager, Product };
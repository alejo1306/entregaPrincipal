const fs = require('fs');

const productsFile = 'productos.json';


//--------------------------------------------------------------------
const getProductsById = (productId) => {
    const products = getProducts();
    return products.find(product => product.id === productId);
};

//---------------------------------------------------------------------
const getProducts = () => {
    const productsData = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(productsData);
};


//-------------------------------------------------------------------------------------
const addProduct = (product) => {
    const products = getProducts();
    product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf-8');
};


//---------------------------------------------------------------------------------------------
const updateProduct = (productId, updatedFields) => {
    const products = getProducts();
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf-8');
    }
};


//-----------------------------------------------------------------------------------------------
const deleteProduct = (productId) => {
    const products = getProducts().filter(product => product.id !== productId);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf-8');
};

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsById
};

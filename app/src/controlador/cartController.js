const fs = require('fs');

const cartsFile = 'carrito.json';


//---------------------------------------------------------------------------------------
const getCart = () => {
    const cartData = fs.readFileSync(cartsFile, 'utf-8');
    return JSON.parse(cartData);
};


//--------------------------------------------------------------------------------------
const createCart = () => {
    const carts = getCart();
    const newCart = {
        id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
        products: [],
    };
    carts.push(newCart);
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2), 'utf-8');
    return newCart;
};


//----------------------------------------------------------------------------------
const getCartById = (cartId) => {
    const carts = getCart();
    return carts.find(cart => cart.id === cartId);
};


//-----------------------------------------------------------------------------------------------
const addProductToCart = (cartId, productId, quantity) => {
    const carts = getCart();
    const cartIndex = carts.findIndex(cart => cart.id === cartId);

    if (cartIndex !== -1) {
        const cart = carts[cartIndex];
        const existingProductIndex = cart.products.findIndex(product => product.id === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ id: productId, quantity });
        }

        fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2), 'utf-8');
        return cart;
    }

    return null;
};

module.exports = {
    getCart,
    createCart,
    getCartById,
    addProductToCart,
};

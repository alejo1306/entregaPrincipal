const express = require('express');
const router = express.Router();
const { ProductManager } = require('../controlador/productController');

const productManager = new ProductManager();

//---------------------------------------------------------------------------------------------
router.post('/', (req, res) => {
    const newCart = productManager.createCart();
    res.json(newCart);
});


//-----------------------------------------------------------------------------------------------
router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = productManager.getCartById(cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});


//------------------------------------------------------------------------------------------------------
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1;

    if (isNaN(cartId) || isNaN(productId) || isNaN(quantity)) {
        return res.status(400).json({ error: 'ID de carrito, ID de producto o cantidad inválidos' });
    }

    const cart = productManager.addProductToCart(cartId, productId, quantity);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart);
});

module.exports = router;
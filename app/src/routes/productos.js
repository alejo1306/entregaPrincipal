const express = require('express');
const router = express.Router();
const productController = require('../controlador/productController');

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        let products = productController.getProducts();

        if (limit) {
            products = products.slice(0, parseInt(limit));
        }

        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productController.getProductsById(productId);

        if (!product) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, thumbnails, category } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
        }

        const product = {
            title,
            description,
            code,
            price,
            stock,
            status: true,
            category,
            thumbnails: thumbnails || [],
        };

        productController.addProduct(product);
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;

        if (isNaN(productId)) {
            return res.status(400).json({ success: false, error: 'ID de producto inválido' });
        }

        productController.updateProduct(productId, updatedFields);
        res.json({ success: true, message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        if (isNaN(productId)) {
            return res.status(400).json({ success: false, error: 'ID de producto inválido' });
        }

        productController.deleteProduct(productId);
        res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});



module.exports = router;



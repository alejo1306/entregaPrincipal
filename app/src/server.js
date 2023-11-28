
const express = require('express');
const productRoutes = require('./routes/productos.js');
const cartRoutes = require('./routes/carrito.js');
import { ProductManager, Product } from './controlador/productController.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----------------------------------------------------------------------------
const productManager = new ProductManager();

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//-----------------------------------------------------------------------------------------------------
const product1 = new Product("Arroz", "Descripción del producto 1", 19.99, "imagen1.jpg", "P1", 100);
const product2 = new Product("Pan", "Descripción del producto 2", 29.99, "imagen2.jpg", "P2", 50);
const product3 = new Product("Maiz", "Descripción del producto 3", 9.99, "imagen3.jpg", "P3", 200);

//-------------------------------------------------------------------------------------------------------
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

//---------------------------------------------------------------------------------------------------------------
const productos = productManager.getProducts();
console.log(productos);

//--------------------------------------------------------------------------------------------------------------
const productoBuscado = productManager.getProductsById(2);
console.log(productoBuscado);
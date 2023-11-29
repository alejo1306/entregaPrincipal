
import express from 'express';
import productRoutes from './routes/productos.js';
import cartRoutes from './routes/carrito.js';
import { ProductManager, Product } from './controlador/productController.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const express = require('express');
const productRoutes = require('./routes/productos');
const cartRoutes = require('./routes/carrito');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

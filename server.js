const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulando una base de datos en memoria
let precios = [
    { id_precio: 1, producto: 'Producto A', precio: 100 },
    { id_precio: 2, producto: 'Producto B', precio: 150 }
];

let productos = [
    { id_producto: 1, nombre: 'Producto A', descripcion: 'Descripción del Producto A' },
    { id_producto: 2, nombre: 'Producto B', descripcion: 'Descripción del Producto B' }
];

let clientes = [
    { id_usuario: 1, nombre: 'Juan Perez', email: 'juan@example.com', direccion: 'Calle 123', telefono: '1234567890' },
    { id_usuario: 2, nombre: 'Maria Gomez', email: 'maria@example.com', direccion: 'Calle 456', telefono: '0987654321' }
];

// Rutas para precios
// Obtener todos los precios
app.get('/precios', (req, res) => {
    res.json(precios);
});

// Crear un nuevo precio
app.post('/precios', (req, res) => {
    const { producto, precio } = req.body;
    const id_precio = precios.length ? precios[precios.length - 1].id_precio + 1 : 1; // Generar un nuevo ID
    const nuevoPrecio = { id_precio, producto, precio };
    precios.push(nuevoPrecio);
    res.status(201).json(nuevoPrecio);
});

// Editar un precio
app.put('/precios/:id_precio', (req, res) => {
    const { id_precio } = req.params;
    const { producto, precio } = req.body;
    let precioObj = precios.find(p => p.id_precio == id_precio);
    if (precioObj) {
        precioObj.producto = producto || precioObj.producto;
        precioObj.precio = precio || precioObj.precio;
        res.json(precioObj);
    } else {
        res.status(404).send('Precio no encontrado');
    }
});

// Eliminar un precio
app.delete('/precios/:id_precio', (req, res) => {
    const { id_precio } = req.params;
    const index = precios.findIndex(p => p.id_precio == id_precio);
    if (index !== -1) {
        const deletedPrecio = precios.splice(index, 1);
        res.json(deletedPrecio);
    } else {
        res.status(404).send('Precio no encontrado');
    }
});

// Rutas para productos
// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Crear un nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion } = req.body;
    const id_producto = productos.length ? productos[productos.length - 1].id_producto + 1 : 1; // Generar un nuevo ID
    const nuevoProducto = { id_producto, nombre, descripcion };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Editar un producto
app.put('/productos/:id_producto', (req, res) => {
    const { id_producto } = req.params;
    const { nombre, descripcion } = req.body;
    let producto = productos.find(p => p.id_producto == id_producto);
    if (producto) {
        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Eliminar un producto
app.delete('/productos/:id_producto', (req, res) => {
    const { id_producto } = req.params;
    const index = productos.findIndex(p => p.id_producto == id_producto);
    if (index !== -1) {
        const deletedProducto = productos.splice(index, 1);
        res.json(deletedProducto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Rutas para clientes
// Obtener todos los clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const { nombre, email, direccion, telefono } = req.body;
    const id_usuario = clientes.length ? clientes[clientes.length - 1].id_usuario + 1 : 1; // Generar un nuevo ID
    const nuevoCliente = { id_usuario, nombre, email, direccion, telefono };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Editar un cliente
app.put('/clientes/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, email, direccion, telefono } = req.body;
    let cliente = clientes.find(c => c.id_usuario == id_usuario);
    if (cliente) {
        cliente.nombre = nombre || cliente.nombre;
        cliente.email = email || cliente.email;
        cliente.direccion = direccion || cliente.direccion;
        cliente.telefono = telefono || cliente.telefono;
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Eliminar un cliente
app.delete('/clientes/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const index = clientes.findIndex(c => c.id_usuario == id_usuario);
    if (index !== -1) {
        const deletedCliente = clientes.splice(index, 1);
        res.json(deletedCliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

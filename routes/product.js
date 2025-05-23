// routes/product.js
import express from 'express';
const productRoutes = express.Router();

let products = [
  { id: 1, name: "Chocolate Bar", price: 2.5 },
  { id: 2, name: "Milk Powder", price: 5.0 }
];

// GET all products
productRoutes.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
productRoutes.get('/:id', (req, res) => {
  const product = products.find(item => item.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// POST add new product
productRoutes.post('/', (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product by ID
productRoutes.put('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (req.body.name !== undefined) product.name = req.body.name;
  if (req.body.price !== undefined) product.price = req.body.price;

  res.json(product);
});

// DELETE product by ID
productRoutes.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

export default productRoutes;

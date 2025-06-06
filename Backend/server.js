const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Define API routes
let customers = [
  { id: 1, name: "Sangeeta", email: "sangeeta@example.com", address: "Jagdalpur" }
];

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.post("/customers", (req, res) => {
  const newCustomer = { ...req.body, id: customers.length + 1 };
  customers.push(newCustomer);
  res.json({ message: "Customer added", customer: newCustomer });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

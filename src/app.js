const express = require('express');

const app = express();
app.use(express.json());

const tasks = [];
let nextTaskId = 1;

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 75000,
    inStock: true
  },
  {
    id: 2,
    name: "Mouse",
    price: 1200,
    inStock: true
  },
  {
    id: 3,
    name: "Keyboard",
    price: 2500,
    inStock: false
  }
];

app.get('/', (_request, response) => {
  response.json({ message: 'Simple backend is running' });
});

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.get('/api/tasks', (_request, response) => {
  response.json(tasks);
});

app.post('/api/tasks', (request, response) => {
  const { title } = request.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return response.status(400).json({ error: 'title is required' });
  }

  const task = { id: nextTaskId++, title: title.trim(), completed: false };
  tasks.push(task);
  return response.status(201).json(task);
  //success
});

app.get('/api/products', (request, response) => {
  return response.status(200).json(products);
});

module.exports = app;

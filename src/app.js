const express = require('express');

const app = express();
app.use(express.json());

const tasks = [];
let nextTaskId = 1;

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

module.exports = app;

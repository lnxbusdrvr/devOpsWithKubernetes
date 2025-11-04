const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());


let todos = [
  "Learn Javascript",
  "Learn React",
  "Build a project",
  "Learn Kubernetes"
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Content is required' });
  }
  todos.push(content.trim());
  res.status(201).json({ message: 'Todo added' });
});


app.listen(PORT, () => {
  console.log(`Todo backend running on port ${PORT}`);
});


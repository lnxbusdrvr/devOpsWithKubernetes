const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const path = require('path');

const imageFile = path.join(__dirname, 'current.jpg'); 


const todos = [
  "Learn Javascript",
  "Learn React",
  "Build a project",
  "Learn Kubernetes"
];

app.get('/', (req, res) => {
  const todoList = todos.map(todo => `<li>${todo}</li>`).join('');
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>The project App</h1>
        <img src="/image" alt="random image" width="600"/>
        <div>
          <form method="POST" action="/todos"> 
            <input
              type="text"
              name="content"
              maxlength="140"
              placeholder="New todo item (max 140 chars)"
              required
            />
              <button type="submit">
                Create todo
              </button>
          </form>
        </div>
        <div>
          <ul>
            ${todoList}
</ul>
        </div>

        <div>DevOps with Kubernetes 2025</div>
      </body>
    </html>
  `);
});

app.post('/todos', (req, res) => {
   const newTodo = req.body.content?.trim();

  if (!newTodo) {
    return res.redirect('/');
  }

  todos.push(newTodo);

  res.redirect('/');
});

app.get('/image', (req, res) => {
  res.sendFile(imageFile);
});

app.listen(PORT, () => {
  console.log(`Log input output server running on port ${PORT}`);
});

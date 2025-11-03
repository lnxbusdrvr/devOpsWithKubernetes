const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const path = require('path');

const imageFile = path.join(__dirname, 'current.jpg'); 

const TODO_BACKEND_URL = process.env.TODO_BACKEND_URL
  || 'http://todo-backend-svc:3001';


app.get('/', async (req, res) => {
  let todos = [];
  try {
    const response = await axios.get(`${TODO_BACKEND_URL}/todos`)
    todos = Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Failed to fetch todos:", error.message);
  }
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

app.post('/todos', async (req, res) => {
   const newTodo = req.body.content?.trim();

  if (!newTodo)
    return res.redirect('/');

  try {
    await axios.post(`${TODO_BACKEND_URL}/todos`, { content: newTodo });
  } catch (error) {
    console.error("Failed to post todo:", error.message);
  }
  res.redirect('/');
});

app.get('/image', (req, res) => {
  res.sendFile(imageFile);
});


app.listen(PORT, () => {
  console.log(`Log input output server running on port ${PORT}`);
});

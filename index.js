const express = require('express');


const server = express();
server.use(express.json());
server.use(registerRoute);

let countReq = 0;

const projects = [
  {
    id: "1",
    title: 'Novo projeto',
    tasks: ['Nova tarefa']
  }
];

server.get('/projects', (req, res) => {
  res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const newProject = {
    id,
    title,
    tasks: []
  };
  projects.push(newProject);
  res.json(projects);
});

server.put('/projects/:id', projectExists, (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  let projectIndex = null;
  projects.map((obj, index) => {
    if (obj.id == id) {
      projectIndex = index;
    }
  });

  projects[projectIndex].title = title

  res.json(projects[projectIndex]);
});

server.delete('/projects/:id', projectExists, (req, res) => {
  const id = req.params.id;

  let projectIndex = null;
  projects.map((obj, index) => {
    if (obj.id == id) {
      projectIndex = index;
    }
  });

  projects.splice(projectIndex, 1);

  res.send();
});

server.post('/projects/:id/tasks', projectExists, (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  let projectIndex = null;
  projects.map((obj, index) => {
    if (obj.id == id) {
      projectIndex = index;
    }
  });

  projects[projectIndex].tasks.push(title);

  res.json(projects[projectIndex]);
});

// Middlewares

function projectExists(req, res, next) {
  const id = req.params.id;
  let projectIndex = null;
  projects.map((obj, index) => {
    if (obj.id == id) {
      projectIndex = index;
    }
  });
  if (projectIndex === null) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  next();
}

function registerRoute(req, res, next) {
  console.log(`Requisições executadas: ${++countReq}`);
  return next();
}

server.listen(3000);
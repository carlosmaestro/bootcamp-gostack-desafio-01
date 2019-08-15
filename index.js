const express = require('express');


const server = express();
server.use(express.json());

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

server.put('/projects/:id', (req, res) => {
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

server.delete('/projects/:id', (req, res) => {
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





server.listen(3000);
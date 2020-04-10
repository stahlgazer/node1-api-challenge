const express = require("express");
const Projects = require("../helpers/projectModel");
const Actions = require("../helpers/actionModel.js");
const router = express.Router();

// checked - get all projects
router.get("/", (req, res) => {
    Projects.get().then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({ error: "Error retrieving projects" })
    })
})

// checked - get specific project by id .get(id)
router.get("/:id", validateProject, (req, res) => {
  Projects.get(req.params.id)
    .then(projectFound => {
      res.status(200).json(projectFound);
    })
    .catch(error => {
      res.status(500).json({ errror: "Error retrieving project" });
    });
});

// checked - get a specific project's actions by id .getProjectActions(projectId)
router.get("/:id/actions", validateProject, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actionsFound => {
      res.status(200).json(actionsFound);
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving actions" });
    });
});

// checked - post a new project .insert(project)
router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(error => {
      res.status(500).json({ error: "Error adding project" });
    });
});

// checked - update a project by id .update(id, changes)
router.put("/:id", validateProject, (req, res) => {
  Projects.update(req.project.id, req.body)
    .then(changes => {
      res.status(200).json(changes);
    })
    .catch(error => {
      res.status(500).json({ error: "Error updating project" });
    });
});

// checked - delete a project by id .remove(id)
router.delete("/:id", validateProject, (req, res) => {
  Projects.remove(req.project.id)
    .then(count => {
      res.status(200).json({ message: "This project has been nuked" });
    })
    .catch(error => {
      res.status(500).json({ error: "Error deleting this project" });
    });
});

// checked - post a new action to a project
router.post("/:id/actions", validateProject, (req, res) => {
  const actionWithProjectId = {
    ...req.body,
    project_id: req.project.id
  };
  Actions.insert(actionWithProjectId)
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(error => {
      res.status(500).json({ error: "Error adding action" });
    });
});

// checked - validate project id exists
function validateProject(req, res, next) {
  Projects.get(req.params.id)
    .then(projectFound => {
      if (projectFound) {
        req.project = projectFound;
        next();
      } else {
        res.status(400).json({ error: "This project doesn't exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Error validating project ID" });
    });
}

module.exports = router;